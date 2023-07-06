const {Configuration, OpenAIApi} = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

exports.autoGenerateQuestions = async (prompt) => {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt} dengan ketentuan soal,pilihan jawaban, jawaban benar. format wajib seperti contoh berikut 
            '[
                {
                    "text": "Berapakah hasil dari 8:2?",
                     "options": ["4","6","8","10"],
                     "correctOption": "4"
                 }
             ]' catatan: pastikan correctOption adalah jawaban yang paling tepat dan benar`,
            max_tokens: 1000,
            temperature: 0.8
        });
        const responseData = completion.data.choices[0].text;
        return responseData;
    } catch (error) {
        return error.response ? error.response : error.message;
    }
}

