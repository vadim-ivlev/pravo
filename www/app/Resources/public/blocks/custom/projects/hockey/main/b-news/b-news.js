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
                            
                            scores: RGB('projects.hockey.scores'), // турнирная таблица

                            goalscorers: RGB('projects.hockey.goalscorers'), // турнирная таблица
							
							ads: RGB('projects.hockey.ads:sidebar-right, tablet tabletLandscape desktop desktopFull:active') // реклама
                            
                        }
                        
                    }
                }
            ]
        }
    
    }
    
};