# matrix

> 从计算机的视角来解决数学问题

## 矩阵

<style type="text/css">
b { font-style: italic; }
</style>
<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
        extensions: ["tex2jax.js"],
        jax: ["input/TeX","output/HTML-CSS"],
        tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]}
    });
</script>
<script src="http://258i.com/static/bower_components/MathJax/MathJax.js"></script>

设有一个<i>m</i>行<i>n</i>列的矩阵<b>A</b>

<script type="math/tex; mode=display">
A_{m\times n} = \begin{bmatrix}
a_{11} \quad a_{12} \quad ... \quad a_{1n} \\
a_{21} \quad a_{22} \quad ... \quad a_{2n} \\
\vdots \qquad \vdots \qquad \qquad \vdots  \\
a_{m1} \quad a_{m2} \quad ... \quad a_{mn}
\end{bmatrix} 
</script>

<script type="math/tex"> 其中，
( a_{i1}, a_{i2}, \dotsb, a_{in} ) 
被称为第
i(1\le i \le n)
个行向量，
( a_{1j}, a_{2j}, ..., a_{mj} )^T
被称为第
j(1\le j \le m)
个列向量。
</script>





### 矩阵加法

> 只有两个矩阵的`行数和列数都相同`时才能进行加法运算。

<script type="math/tex">
设两个矩阵A和B都是m\times n，把他们对应位置的元素相加而得到的矩阵叫做A、B的和，记为A+B，即
</script>

<script type="math/tex; mode=display">
A+B = \begin{bmatrix}
a_{11}+b_{11} \quad a_{12}+b_{12} \quad ... \quad a_{1n}+b_{1n} \\
a_{21}+b_{21} \quad a_{22}+b_{22} \quad ... \quad a_{2n}+b_{2n} \\
\vdots \qquad \qquad \vdots \qquad \qquad \qquad \vdots  \\
a_{m1}+b_{m1} \quad a_{m2}+b{m2} \quad ... \quad a_{mn}+b_{mn}
\end{bmatrix} 
</script>





### 数乘矩阵

<script type="math/tex">
用数k乘矩阵A的每一个元素而得的矩阵叫做k与A之积，记为kA，即
</script>

<script type="math/tex; mode=display">
kA = \begin{bmatrix}
ka_{11} \quad ka_{12} \quad ... \quad ka_{1n} \\
ka_{21} \quad ka_{22} \quad ... \quad ka_{2n} \\
\vdots \qquad \vdots \qquad \qquad \vdots  \\
ka_{m1} \quad ka_{m2} \quad ... \quad ka_{mn}
\end{bmatrix} 
</script>


### 矩阵的乘法运算

只有当`前`一矩阵的`列数`等于`后`一矩阵的`行数`时，两个矩阵才能相乘，即

<script type="math/tex; mode=display">
C_{m\times n} = A_{m\times p} \cdot B_{p\times n}
</script>

<script type="math/tex">
\text{矩阵}C中的每一个元素c_{ij}=\sum_{k=1}^p{a_{ik}b_{kj}}， 下面用一个简单的例子来说明。\\
设A为2\times 3的矩阵，B为3\times 2的矩阵，则两者的乘积为
</script>

<script type="math/tex; mode=display">
\begin{split}
C_{m\times n} &= A\cdot B \\
      &= \begin{bmatrix}
            a_{11} \quad a_{12} \quad a_{13} \\
            a_{21} \quad a_{22} \quad a_{23}
            \end{bmatrix}
            \begin{bmatrix}
            b_{11} \quad b_{12} \\
            b_{21} \quad b_{22} \\
            b_{31} \quad b_{32}
            \end{bmatrix} \\
      &= \begin{bmatrix}
            a_{11}b_{11}+a_{12}b_{21}+a_{13}b_{31} \quad a_{11}b_{12}+a_{12}b_{22}+a_{13}b_{32} \\
            a_{21}b_{11}+a_{22}b_{21}+a_{23}b_{31} \quad a_{21}b_{12}+a_{22}b_{22}+a_{23}b_{32} \\
            \end{bmatrix}
\end{split}
</script>





### 单位矩阵

<script type="math/tex">
对于一个n\times n的矩阵，如果它的主对角线上各个元素均为1，其余元素都为0，则该矩阵称为单位阵，记为I_n。
</script>

<script type="math/tex; mode=display">
I_n = \begin{bmatrix}
1 \qquad \qquad \qquad \qquad \\
\qquad 1 \qquad \qquad \qquad \\
\qquad \qquad 1 \qquad \qquad \\
\qquad \qquad \qquad \ddots \qquad \\
\qquad \qquad \qquad \qquad 1 
\end{bmatrix}
</script>

<script type="math/tex">
对于任意m\times n的矩阵，恒有
</script>

<script type="math/tex; mode=display">
A_{m\times n}\cdot I_n = A_{m\times n} \\
I_m\cdot A_{m\times n} = A_{m\times n}
</script>


* 单位矩阵是`方阵`
* 主对角线是`从左上到右下`的方向



### 矩阵的转置

<script type="math/tex">
交换一个矩阵A_{m\times n}的所有行列元素，那么所得到的n\times m的矩阵被称为原有矩阵的转置，记为A^T，即
</script>

<script type="math/tex; mode=display">
A^T=\begin{bmatrix}
a_{11} \quad a_{21} \quad \dotsm \quad a_{m1} \\
a_{12} \quad a_{22} \quad \dotsm \quad a_{m2} \\
\vdots \qquad \vdots  \qquad \qquad \vdots \\
a_{1n} \quad a_{2nn} \quad \dotsm \quad a_{mn}
\end{bmatrix}
</script>

常用矩阵转置运算，矩阵的积比较特殊，需要注意。

<script type="math/tex; mode=display">
\begin{split}
( A^T )^T &= A \\
( A + B )^T &= A^T + B^T \\
( kA )^T &= kA^T \\
( A \cdot B )^T &= B^T \cdot A^T
\end{split}
</script>


#### 对称矩阵和反对称矩阵



### 矩阵的逆

<script type="math/tex">
对于一个n\times n的方阵A，如果存在一个n\times n的方阵B，使得
</script>
<script type="math/tex; mode=display">
        A \cdot B = B \cdot A = I_n \\
</script>
<script type="math/tex">
则称B为A的逆，记为B=A^{-1}。同时A被称为非奇异矩阵。\\
矩阵的逆是相互的，若A是B的逆，同样A也可记为A=B^{-1}，B也是一个非奇异矩阵。
</script>


#### 定理1
任何非奇异矩阵`有且只有一个`逆矩阵

#### 定理2
<script type="math/tex">
矩阵A可逆的充要条件是其行列式|A| \neq 0，且
</script>

<script type="math/tex; mode=display">
A^{-1} = \frac{1}{|A|} A^{*}
</script>

<script type="math/tex">
其中A^{*}为矩阵A的伴随矩阵，也记作adjA。
</script>




### 矩阵运算的基本性质

矩阵加法适合交换律和结合律。

<script type="math/tex; mode=display">
\begin{split}
A + B  &= B + A \\
A + ( B + C )  &= ( A + B ) + C
\end{split}
</script>


### 齐次坐标


todo
## 行列式

二阶行列式、三阶行列式

代数余子式

### 性质
* 行列式`行列互换`，其值相等
* 行列式`可按行展开`


## 代数余子式矩阵及伴随矩阵 
> 见p64
<script type="math/tex">
cofA为矩阵A的代数余子式矩阵，cofA的转置矩阵记作A^{*}，称为矩阵A的伴随矩阵，也记作adjA。
</script>


## 分块矩阵

## 行向量与列向量

## 矩阵的秩

## 向量的线性相关性

## 齐次与非齐次线性方程

## 标准基及过渡矩阵


