module.exports = {
    // "list": {
    //     "object": "questions_list",
    //     "name": "",
    //     "showBlocks": {
    //         "author": true,
    //         "title": true,
    //         "text": true,
    //         "tags": true,
    //         "answer": {
    //             "jurist": true
    //         }
    //     },
    //     "include": "/views/include/tmpl-question_list/jurists-446/limit-20/index.html"
    // },
    "item": {
        "object": "questions_item",
        "name": "",
        "showBlocks": {
            "author": true,
            "date": true,
            "title": true,
            "text": true,
            "tags": true
        },
        "include": "/include/tmpl-question_item/jurists-446/limit-20/offset-9/index.html"
    },
    "latest": {
        "object": "questions_latest",
        "name": "Последние вопросы",
        "showBlocks": {
            "title": true,
            "mod": true,
            "tags": false
        },
        "include": "/include/tmpl-question_latest/jurists-446/limit-20/offset-9/index.html"
    },
    "similar": {
        "object": "similar_questions",
        "name": "Похожие вопросы",
        "showBlocks": {
            "title": true
        }
    }
};