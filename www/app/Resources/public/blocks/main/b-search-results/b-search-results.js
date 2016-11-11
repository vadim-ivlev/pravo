module.exports = function(data){

    return {

        name: "bSearchResults",
        opt: {
            contents: [
                {
                    param: {

                        blocks: {

                            questionsList: RGB('questions:list'), // список вопросов в результатах поиска

                            juristsList: RGB('jurists:list'), // список юристов в результатах поиска

                        }
                    }
                }
            ]
        }

    }

};