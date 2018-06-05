# box-collision

> 盒碰撞算法


    isCollideSE( b1, b2 )
    isCollideNE( b1, b2 )

    detectCollision( b1, b2 ) {
        if ( isCollideNE( b1, b2 )
            || isCollideSE( b1, b2 )
            || isCollideNE( b2, b1 )
            || isCollideSE( b2, b1 ) ) {
            return true;
        }
        return false;
    }

