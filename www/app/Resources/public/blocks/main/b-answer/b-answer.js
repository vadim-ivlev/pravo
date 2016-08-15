/*
 * Ответ на вопрос
 *
 */

module.exports = function(data){

    return {

        name: "bAnswer",
        opt: {
            contents: [
                {
                    param: {

                        blocks: {
                            share: RGB('share') // share
                        }

                    }
                }
            ]
        }

    }

};