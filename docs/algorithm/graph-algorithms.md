# graph algorithms


## 基于BFS的路径算法

计算`无权图`中，两点之间经过的最少`边数`，或者`跳数`，在关系图谱中也有称为`度数`。

### Features

* `无权图`的`单源最短路径`，能计算一个指定点到所有其他剩余点的最短路径

### 算法思想 

从源点开始进行`广度优先遍历`，节点所在`层数`即为从源点到该节点的`最短路径长度`，从该节点往上回溯，其`祖先节点`则依次构成最短路径上的`途经点`。

### 算法实现

    void unweighted( Table T, vertex s ) {
        queue q;
        vertex v, w;

        q = createQueue( MAX_VERTEX_SIZE );
        enqueue( s, q );

        while ( !isEmpty( q ) ) {
            v = Dequeue( q );
            T[ v ].known = true;

            for each w adjacent to v
                if ( T[ w ].dist == Infinity ) {
                    T[ w ].dist = T[ v ].dist + 1;
                    T[ w ].path = v;
                    enqueue( w, q );
                }
        }
        Disposequeue( Q );
    }

算法完毕后，`T[ k ].dist`为节点s到节点k的`最短路径长度`，`T[ k ].path`表示节点s到节点k的最短路径的`最后一个途经点`。



## Dijkstra算法 

`荷兰`计算机科学家Dijkstra于`1959年`提出。

### Features

* `单源最短路径`，计算从一个指定点到所有其他剩余点的最短路径
* 解决`带权有向图`最短路径问题
* 不支持存在`负权边`的情况

### 算法思想

设`G=(V,E)`是一个`带权有向图`，把图中顶点集合V分成`两组`：

* 第一组为`已求出最短路径的顶点集合`（用S表示，初始时S中只有一个源点，以后每求得一条最短路径 , 就将加入到集合S中，直到全部顶点都加入到S中，算法就结束了）

* 第二组为`其余未确定最短路径的顶点集合`（用U表示），按最短路径`长度的递增次序`依次把第二组的顶点加入S中

在加入的过程中，总保持从源点v到S中各顶点的最短路径长度不大于从源点v到U中任何顶点的最短路径长度。此外，每个顶点对应一个距离，S中的顶点的距离就是从v到此顶点的最短路径长度，U中的顶点的距离，是从v到此顶点只包括S中的顶点为中间顶点的当前最短路径长度。

### 算法演示

 <img src="./img/dijkstra-animation-171023.gif">

### 算法实现

    const int  MAXINT = 32767;
    const int MAXNUM = 10;
    int dist[ MAXNUM ];
    // `path[ k ] = v`的含义为从节点v0到k的路径中最后一个途经点为v
    int path[ MAXNUM ];

    int A[ MAXUNM ][ MAXNUM ];                          // 邻接矩阵，i行j列表示节点i到j的邻接距离

    void Dijkstra( int v0 ) {
        bool S[ MAXNUM ];                               // 判断是否已存入该点到S集合中
        int n = MAXNUM;
        for( int i = 1; i <= n; ++i ) {
        　　dist[ i ] = A[ v0 ][ i ];
        　　S[ i ] = false;                             // 初始都未用过该点
        　　if( dist[ i ] == MAXINT ) { 
              　　path[ i ] = -1;
            }
     　     else {
              　　path[ i ] = v0;
            }
        }
        dist[ v0 ] = 0;                                 // 到自身的距离为0
        S[ v0 ] = true;                                 // 初始S集合为v0
     　 for( int i = 2; i <= n; i++ ) {
            int mindist = MAXINT;
            int u = v0; 　　                            // 找出当前未使用的点j的dist[j]最小值
            for( int j = 1; j <= n; ++j )
                if( !S[j] && dist[ j ] < mindist ) {
                    u = j;                              // u保存当前邻接点中距离最小的点的号码 
                    mindist = dist[ j ];
                }
            S[u] = true; 
            for( int j = 1; j <= n; j++ ) {
                if( !S[ j ] && A[ u ][ j ] < MAXINT ) {
                    // 在通过新加入的u点路径找到离v0点更短的路径  
                    if( dist[ u ] + A[ u ][ j ] < dist[ j ] ) {     
                        dist[ j ] = dist[ u ] + A[ u ][ j ];    // 更新dist 
                        path[ j ] = u;                          // 记录前驱顶点 
                    }
                }
            }
        }
    }

算法完毕后，`dist[ k ]`为节点v0到节点k的`最短路径长度`，`path[ k ]`表示节点v0到节点k的最短路径的`最后一个途经点`。


## Floyd算法

也称为`Floyd-Warshall`算法

### Features

* 解决`任意两点间`最短路径问题
* 能正确处理`负权边`的情况
* 时间复杂度`O(n^3)`，空间复杂度`O(n^2)`

### 算法思想

Floyd算法是一个经典的`动态规划算法`。用通俗的语言来描述的话，首先我们的目标是寻找从点i到点j的最短路径。从动态规划的角度看问题，我们需要为这个目标重新做一个诠释（这个诠释正是动态规划最富创造力的精华所在）。

从任意节点i到任意节点j的最短路径不外乎`两种可能`，1是直接从i到j，2是从i经过若干个节点k到j。所以，我们假设`Dis(i,j)`为节点u到节点v的最短路径的距离，对于每一个节点k，我们检查`Dis(i,k) + Dis(k,j) < Dis(i,j)`是否成立，如果成立，证明从i到k再到j的路径比i直接到j的路径短，我们便设置`Dis(i,j) = Dis(i,k) + Dis(k,j)`，这样一来，当我们遍历完所有节点k，`Dis(i,j)`中记录的便是`i到j的最短路径的距离`。

### 算法实现

    typedef struct { 
        char vertex[ VertexNum ];               // 顶点表         
        int edges[ VertexNum ][ VertexNum ];    // 邻接矩阵,可看做边表         
        int n,e;                                // 图中当前的顶点数和边数         
    } MGraph; 

    void Floyd( MGraph g ) {
        int dist[ MAXV ][ MAXV ];
        int path[ MAXV ][ MAXV ];
        int i, j, k, n = g.n;
        for( i = 0; i < n; i++ ) {
           for( j = 0; j < n; j++ ) { 　　
               dist[ i ][ j ] = g.edges[ i ][ j ];
               path[ i ][ j ] = -1;
           }
        }
        for( k = 0; k < n; k++ ) { 
            for( i = 0; i < n; i++ )
                for( j = 0; j < n; j++ ) {
                    if( dist[ i ][ j ] > dist[ i ][ k ] + dist[ k ][ j ] ) {
                        dist[ i ][ j ] = dist[ i ][ k ] + dist[ k ][ j ];
                        path[ i ][ j ] = k;
                    } 
                }
        } 
    } 

算法结束后，`dist[ i ][ j ]`为节点i到j的最短路径长度；`path[ i ][ j ]`表示节点i到节点j的最短路径经过点k，可通过继续查找节点i到k，节点k到j的最短路径经过的中间点，如此往复，最终可以输出节点i到节点j的`最短路径`。


## Resources

* 最短路径算法 - 无权最短路径 <http://blog.csdn.net/tanga842428/article/details/52582817>
* 最短路径 - Dijkstra算法和Floyd算法 <http://www.cnblogs.com/biyeymyhjob/archive/2012/07/31/2615833.html>

