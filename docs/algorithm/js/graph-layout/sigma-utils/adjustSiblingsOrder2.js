sigma.utils.adjustSiblingsOrder2
    = function( parentNode, options ) {
    if ( !parentNode ) {
        throw new Error('sigma.utils.adjustSiblingsOrder2: no parentNode');
    }

    var opt = options || {}
        , siblings = parentNode._wt_children
        , siblingGroups
        , newSiblings = []
        ;

    siblingGroups = _getGroups( siblings );
    siblingGroups.sort( function( a, b ) {
        return a.weight - b.weight;
    } );
    _layoutGroups( siblingGroups );
    parentNode._wt_children = newSiblings;
    return { 
        siblingGroups: siblingGroups 
        , newSiblings: newSiblings
    };

    function _layoutGroups( groups ) {
        groups.forEach( function( group ) {
            var root = group.root
                , visitedNodes = {}
                , groupNodes = []
                ;

            _travel( root );
            if ( group.direction == 'rtl' ) {
                groupNodes.reverse();
            }
            newSiblings = newSiblings.concat( groupNodes );

            // pre-order depth travel
            function _travel( node ) {
                // must check first if node has been visited
                if ( visitedNodes[ node.id ] ) {
                    return;
                }
                visitedNodes[ node.id ] = 1;
                groupNodes.push( node );

                var leNodes = node._wt_lenodes 
                    // may have duplicated items in `children` array
                    , children = leNodes.di_brothers.concat( leNodes.indi_brothers )
                    ;

                _uniq( children );
                // drop out visited nodes
                for ( var i = children.length - 1; i >= 0; i-- ) {
                    if ( visitedNodes[ children[ i ].id ] ) {
                        children.splice( i, 1 );
                    }
                }

                children.forEach( function( child ) {
                    _travel( child );
                } );
            }
        } );
    }

    // divide into groups or trees
    function _getGroups( siblings ) {
        var groups = []
            , group
            , visitedNodes = {} 
            , node
            , info
            ;

        while ( ( node = _hasMore() ) ) {
            info = _depthTravel( node );
            group = _getRoot( info );
            if ( !group.root ) {
                group = { root: node, direction: 'ltr', weight: 4 };
            }
            groups.push( group );
        }
        return groups;

        function _getRoot( info ) {
            var root
                , direction = 'ltr'
                , weight = 4
                ;

            if ( ( root = info.hasLeftDiExBrother[ 0 ] ) ) {
                weight = 1;
            }
            else if ( ( root = info.hasRightDiExBrother[ 0 ] ) ) {
                direction = 'rtl';
                weight = 10;
            }
            else if ( ( root = info.hasLeftInDiExBrother[ 0 ] ) ) {
                weight = 2;
            }
            else if ( ( root = info.hasRightInDiExBrother[ 0 ] ) ) {
                direction = 'rtl';
                weight = 9;
            }
            else if ( ( root = info.hasLeftOtherExNode[ 0 ] ) ) {
                weight = 3;
            }
            else if ( ( root = info.hasRightOtherExNode[ 0 ] ) ) {
                direction = 'rtl';
                weight = 8;
            }
            else if ( ( root = info.leafOrSingle[ 0 ] ) ) {}
            else {
                root = null;
            }

            return {
                root: root
                , direction: direction
                , weight: weight 
            };
        }

        function _depthTravel( node ) {
            var leNodes = node._wt_lenodes 
                // may have duplicated items in `children` array
                , children = leNodes.di_brothers.concat( leNodes.indi_brothers )
                , di_ex_brothers = leNodes.di_ex_brothers
                , indi_ex_brothers = leNodes.indi_ex_brothers
                , other_ex_nodes = leNodes.other_ex_nodes
                , exNode
                , info = {
                    leafOrSingle: []
                    , hasLeftDiExBrother: []
                    , hasLeftInDiExBrother: []
                    , hasRightDiExBrother: []
                    , hasRightInDiExBrother: []
                    , hasLeftOtherExNode: []
                    , hasRightOtherExNode: []
                }
                ;

            _uniq( children );
            if ( children.length <= 1 ) {
                info.leafOrSingle.push( node );
            }

            for ( var i = 0; i < di_ex_brothers.length; i++ ) {
                exNode = di_ex_brothers[ i ];
                if ( typeof exNode.hier_x != 'undefined' ) {
                    info.hasLeftDiExBrother.push( node );
                    break;
                }
                else {
                    info.hasRightDiExBrother.push( node );
                    break;
                }
            }

            for ( var i = 0; i < indi_ex_brothers.length; i++ ) {
                exNode = indi_ex_brothers[ i ];
                if ( typeof exNode.hier_x != 'undefined' ) {
                    info.hasLeftInDiExBrother.push( node );
                    break;
                }
                else {
                    info.hasRightInDiExBrother.push( node );
                    break;
                }
            }

            for ( var i = 0; i < other_ex_nodes.length; i++ ) {
                exNode = other_ex_nodes[ i ];
                if ( typeof exNode.hier_x != 'undefined' ) {
                    info.hasLeftOtherExNode.push( node );
                    break;
                }
                else {
                    info.hasRightOtherExNode.push( node );
                    break;
                }
            }

            // drop out visited nodes
            for ( var i = children.length - 1; i >= 0; i-- ) {
                if ( visitedNodes[ children[ i ].id ] ) {
                    children.splice( i, 1 );
                }
            }

            visitedNodes[ node.id ] = 1;
            children.forEach( function( child ) {
                var _info = _depthTravel( child );
                for ( var i in info ) {
                    info[ i ] = info[ i ].concat( _info[ i ] );
                }
            } );

            return info;
        }

        function _hasMore() {
            for ( var i = 0; i < siblings.length; i++ ) {
                if ( !visitedNodes[ siblings[ i ].id ] ) {
                    return siblings[ i ];
                }
            }
            return null;
        }
    }

    function _uniq( nodesArray ) {
        var _visitedNodes = {}
            , _duplicatedIndexes = []
            , _node
            , _index
            ;

        for ( var i = 0; i < nodesArray.length; i++ ) {
            _node = nodesArray[ i ];
            if ( _visitedNodes[ _node.id ] ) {
                _duplicatedIndexes.push( i ); 
            }
            _visitedNodes[ _node.id ] = 1;
        }

        for ( i = _duplicatedIndexes.length - 1; i >= 0; i-- ) {
            _index = _duplicatedIndexes[ i ];
            nodesArray.splice( _index, 1 );
        }

        return nodesArray;
    }

};
