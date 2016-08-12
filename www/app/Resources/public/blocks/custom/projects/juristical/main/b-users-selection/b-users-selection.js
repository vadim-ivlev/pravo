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

                            usersSpecialization: RGB('projects.juristical.users-specialization'), // выборка юристов по специализации

                            usersSorting: RGB('projects.juristical.users-sorting') // сортировка юристов

                        }

                    }
                }
            ]
        }

    }

};