const { OpenAI } = require('openai');
const dotenv  = require( 'dotenv');


const openai = new OpenAI({
    apiKey: process.env.OPENAPI_KEY 
});


const generateImage = async (req, res) => {

    const { prompt, size } = req.body;

    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024'; 

    try {
        const responseOpenAI = await openai.images.generate({
            prompt: prompt,
            n: 1,
            size: imageSize
        });
        console.log(JSON.stringify(responseOpenAI))
        const imageUrl = responseOpenAI.data[0].url;
        return res.status(200).json({
            success: true,
            url: imageUrl
        });
    }
    catch(error){
        return res.status(400).json({
            success: false,
            message: 'Could not generate image'
        });
    }
}

module.exports = {generateImage};