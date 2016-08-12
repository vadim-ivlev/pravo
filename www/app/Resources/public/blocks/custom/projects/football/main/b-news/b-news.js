/*
 * Тело материала
 * 
 */
 
module.exports = function(data){

    return {
    
        name: "bNews",
        opt: {
            contents: [
                {
                    param: {
                        
                        blocks: {

                            diary: RGB('projects.football.diary, mobile tablet desktop desktopFull:active'), // онлайн дневник
                            diaryTabletLandscape: RGB('projects.football.diary, tabletLandscape'), // онлайн дневник
                            
                            scores: RGB('projects.football.scores'), // турнирная таблица

                            goalscorers: RGB('projects.football.goalscorers'), // турнирная таблица
							
                            //ads: RGB('projects.football.ads:sidebar-right, tablet tabletLandscape desktop desktopFull:active') // реклама
                            ads: RGB('projects.football.ads:aside'), // реклама
                            
                        }
                        
                    }
                }
            ]
        }
    
    }
    
};