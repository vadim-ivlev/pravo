/*
 * Основной контент
 *
 */

module.exports = function(data){

    return {

        name: "bMain",
        opt: {
            contents: [
                {
                    param: {

                        blocks: {

                            questionsItem: RGB('editions.amp.questions:item'), // блок с текстом вопроса

                            answerBlock: RGB('editions.amp.answer', '#answer') // блок с ответом

                        },

                        sortBlocks: {

                            answer: "questionsItem answerBlock"

                        }

                    }
                }
            ]
        }

    }

};