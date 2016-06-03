sigma.utils.getNodeById
    = function(nodes, id){
        if(!nodes) {
            return null;
        }
        for(var i=0; i<nodes.length; i++){
            if(nodes[i].id == id){
                return nodes[i];
            }
        }
        return null;
    } 


