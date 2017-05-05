module.exports = function(data){

    return {

        name: "bSearchResults",
        opt: {
            contents: [
                {
                    param: {

                        blocks: {

                            itemsListQuestions: RGB('items-list:questions'), // список вопросов

                            itemsListJurists: RGB('items-list:jurists'), // список юристов в результатах поиска

                            loadChain: RGB('load-chain') // блок бесконечной подгрузки

                        }
                    }
                }
            ]
        }

    }

};