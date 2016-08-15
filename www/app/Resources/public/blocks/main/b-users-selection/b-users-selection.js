/*
 * Сортировка и выборка в списке юристов
 *
 */

module.exports = function(data){

    return {

        opt: {
            contents: [
                {
                    param: {

                        blocks: {

                            usersSpecialization: RGB('users-specialization'), // выборка юристов по специализации

                            usersSorting: RGB('users-sorting') // сортировка юристов

                        }

                    }
                }
            ]
        }

    }

};