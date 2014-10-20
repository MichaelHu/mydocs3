# string.h备忘

## constants

* NULL

## types

* size_t

## functions

* char *strcpy(char *s, const char *ct);
* char *strncpy(char *s, const char *ct, size_t n); 
    * 拷贝至多n个字符到s，剩余空间用空字符填充
    * 注意：若ct含少于n个字符，则s不会以空字符结束
* char *strcat(char *s, const char *ct);
* ...
* char *strstr(const char *cs, const char *ct);
* size_t strlen(const char *cs);
* char *strerror(int n);
* ...
* void *memset(void *s, int c, size_t n);

