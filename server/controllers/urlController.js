import urlModel from '../models/urlModel.js';
import shortURL from '../models/urlModel.js'
import { nanoid } from 'nanoid';


export const getUrlController = async (req,res) => {
    try {
        const { fullurl, note } = req.body;
        const existingURL = await shortURL.findOne({fullURL:fullurl}) ;
        if(existingURL){
            return res.status(200).send({
                success:false,
                message: "url already exist"
            })
        }
        const newURL = await new shortURL({
            fullURL: fullurl,
            shortID: nanoid(10),
            note: note,
        }).save();
        res.status(200).send({
            success:true,
            message:'url shrnked successfully',
            newURL,
        })  
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error while shrinking',
            error,
        })
    }

}

// to get all url
export const getAllUrlsController = async (req,res) => {
    try {
        const allURLs = await urlModel.find({}).sort({createdAt:-1}).limit(15);
        res.status(200).send({
            success:true,
            message:"all urls displayed successfully",
            allURLs,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in getting all url",
            error
        })
    }
}

//for search
export const searchUrlController = async (req,res) => {
    try {
        const {searchText} = req.params;
        const results = await urlModel.find({
            $or : [
                { fullURL : {$regex : searchText, $options : 'i'}},
                { shortID : {$regex : searchText, $options : 'i'}},
                { note: {$regex : searchText, $options : 'i'}},
            ]
        });
        res.status(200).send({
            success:true,
            message:'searched successfully',
            results,
        })      
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while searching",
            error
        })
    }
}

//redirect
export const redirectController = async (req,res) => {
    try {
        const {shortid} = req.params;
        const result = await urlModel.findOne({shortID:shortid})
        if (result) {
            res.redirect(result.fullURL);
        } else {
            // Handle if short ID is not found
            res.status(404).send('Short URL not found');
        }
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error in getting full url",
            error
        })
    }


}