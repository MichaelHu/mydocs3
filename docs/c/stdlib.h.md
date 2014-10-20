# stdlib.h备忘

## constants

* EXIT_FAILURE
* EXIT_SUCCESS
* RAND_MAX
* NULL

## types

* div_t

        struct {
            int quot;
            int rem;
        }


* ldiv_t

        struct {
            long quot;
            long rem;
        }


* size_t: sizeof操作结果类型

## functions

* int abs(int n);
* long labs(long n);
* div_t div(int num, int denom);
* ldiv_t ldiv(long num, long denom);
* double atof(const char *s);
* int atoi(const char *s);
* long atol(const char *s);
* ...
* void *calloc(size_t nobj, size_t size);
    * 内存区会初始化成0
* void *malloc(size_t size);
    * 内存区不进行初始化
* void *realloc(void *p, size_t size);
    * 新长度取内容p的长度和size的最小值 
* void free(void *p);
* void abort();
* void exit(int status);
* int atexit(void (*fcm)(void));
    * 系统正常退出时的调用
* int system(const char *s);
* char *getenv(const char *name);
* void *bsearch(const void *key, const void *base, size_t n, size_t size, int (*cmp)(const void *keyval, const void *datum));
* void qsort(void *base, size_t n, size_t size, int(*cmp)(const void *, const void *));
* int rand(void);
* void srand(unsigned int seed);
         
