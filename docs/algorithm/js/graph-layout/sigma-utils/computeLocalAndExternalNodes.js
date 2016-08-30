sigma.utils.computeLocalAndExternalNodes
    = function( subGraph, root, options ) {
    var opt = options || {}
        , subGraph = subGraph || { nodes: [], edges: [] }
        , nodes = subGraph.nodes
        , edges = subGraph.edges
        , nodesHash = {}
        , ancestorNodes = {}
        // local and external nodes
        , leNodes 
        , getAdjacentNodes = sigma.utils.getAdjacentNodes
        , nodeIdsOfSameLevel = {}
        ;

    if ( !root ) {
        return;
    }

    nodes.forEach( function( node ) { 
        nodesHash[ node.id ] = node;
    } );

    _sameLevelNodes( root );
    leNodes = _leNodes( root );
    _brothers ( root );
    return;

    function _leNodes( node ) {
        var localNodes = {}
            , externalNodes = {}
            , tmpNodes
            , adjacentNodes = {}
            , children = node._wt_children
            , id = node.id
            , _le_nodes
            ;

        if ( children ) {
            ancestorNodes[ id ] = 1;
            children.forEach( function( child ) {
                var le = _leNodes( child );

                _extend( localNodes, le.local );
                _extend( externalNodes, le.external );
            } );
            delete ancestorNodes[ id ];
        }

        localNodes[ id ] = 1;
        tmpNodes = getAdjacentNodes( node, nodes, edges );
        if ( tmpNodes ) {
            for ( var i = 0; i < tmpNodes.length; i++ ) {
                adjacentNodes[ tmpNodes[ i ].id ] = 1;
            }
        }
        _extend( externalNodes, adjacentNodes );
        for ( var i in ancestorNodes ) {
            delete externalNodes[ i ];
        }
        for ( var i in localNodes ) {
            delete externalNodes[ i ];
        }

        _le_nodes = {
            local: localNodes
            , external: externalNodes
            , adj: adjacentNodes
        };
        node._wt_lenodes = _le_nodes;
        return _le_nodes;
    }

    function _extend( dest, src ) {
        for( var i in src ) {
            dest[ i ] = src[ i ];
        }
    }

    function _sameLevelNodes( node ) {
        var children = node._wt_children
            , idArr = nodeIdsOfSameLevel[ node._wt_level ]
            ;

        if ( !idArr ) {
            idArr = nodeIdsOfSameLevel[ node._wt_level ]  = [];
        }
        idArr.push( node.id );

        if ( children ) {
            children.forEach( function( child ) {
                _sameLevelNodes( child ); 
            } );
        }
    }

    function _brothers ( node, siblingIds ) {
        var level = node._wt_level
            , children = node._wt_children
            , sameLevelIds = nodeIdsOfSameLevel[ level ]
            , id = node.id
            , leNodes = node._wt_lenodes
            , siblingIds = siblingIds || []
            , childIds

            // hash objects
            , localNodes = leNodes.local
            , externalNodes = leNodes.external
            , adjacentNodes = leNodes.adj

            , _di_brothers = {}
            , _indi_brothers = {}
            , _di_ex_brothers = {}
            , _indi_ex_brothers = {}
            , _other_ex_nodes = {}
            , _tmp
            ;

        if ( children ) {
            childIds = children.map( function( child ) { return child.id; } );
            children.forEach( function ( child ) {
                _brothers( child, childIds );
            } );
        }

        var flag
            , _id
            , _node
            , _localNodes
            , _tmpExternalNodes = {}
            ;

        _extend( _tmpExternalNodes, externalNodes );
        for( var j = siblingIds.length - 1; j >= 0; j-- ) {
            _id = siblingIds[ j ];
            if ( _id == id ) {
                continue;
            }

            if ( adjacentNodes[ _id ] ) {
                _di_brothers[ _id ] = 1;
                delete _tmpExternalNodes[ _id ];
            }
        } 

        for( j = sameLevelIds.length - 1; j >= 0; j-- ) {
            _id = sameLevelIds[ j ];
            if ( siblingIds.indexOf( _id ) >= 0 ) {
                continue;
            }

            if ( adjacentNodes[ _id ] ) {
                _di_ex_brothers[ _id ] = 1;
                delete _tmpExternalNodes[ _id ];
            }
            else if ( _tmpExternalNodes[ _id ] ) {
                _indi_ex_brothers[ _id ] = 1;
                delete _tmpExternalNodes[ _id ];
            }
        }

        for ( var i in _tmpExternalNodes ) {

            flag = 0;

            for( var j = siblingIds.length - 1; j >= 0; j-- ) {
                _id = siblingIds[ j ];

                // siblingIds contain node itself
                if ( _id == id ) {
                    continue;
                }

                _node = nodesHash[ _id ];
                _localNodes = _node._wt_lenodes.local;

                // B's localNodes contain `B`, eg. `AabB`, `AaB`
                if ( _localNodes[ i ] ) {
                    _indi_brothers[ _id ] = 1;
                    flag = 1;
                    delete _tmpExternalNodes[ i ];
                }
            } 

            // one external node produce one brother, that's enough.
            if ( flag ) {
                continue;
            }

            for( j = sameLevelIds.length - 1; j >= 0; j-- ) {
                _id = sameLevelIds[ j ];

                if ( siblingIds.indexOf( _id ) >= 0 ) {
                    continue;
                }

                _node = nodesHash[ _id ];
                _localNodes = _node._wt_lenodes.local;

                if ( _localNodes[ i ] ) {
                    _indi_ex_brothers[ _id ] = 1;
                    delete _tmpExternalNodes[ i ];
                }
            }

        }

        _extend( _other_ex_nodes, _tmpExternalNodes );

        _extend(
            node._wt_lenodes
            , {
                di_brothers: _transformToNodes( _di_brothers ) 
                , indi_brothers: _transformToNodes( _indi_brothers )
                , di_ex_brothers: _transformToNodes( _di_ex_brothers )
                , indi_ex_brothers: _transformToNodes( _indi_ex_brothers )
                , other_ex_nodes: _transformToNodes( _other_ex_nodes )
            }
        )

    }

    function _transformToNodes( obj ) {
        var nodes = [], node;
        for ( var i in obj ) {
            if ( node = nodesHash[ i ] ) {
                nodes.push( node );
            }
        }
        if( opt.sortBySubTreeSize ) {
            nodes.sort( function( a, b ) {
                // siblings those have a shorter and smaller subtree
                // are close to each other
                return ( 
                    a._wt_height + a._wt_leaves
                        - b._wt_height - b._wt_leaves
                );
            } );
        }
        return nodes;
    }

};   
