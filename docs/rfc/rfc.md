# rfc

> `Request For Comments（RFC）`，是一系列以编号排定的文件。文件收集了有关互联网相关信息，以及UNIX和互联网社区的软件文件。目前RFC文件是由`Internet Society（ISOC）`赞助发行。基本的`互联网通信协议`都有在RFC文件内详细说明。RFC文件还额外加入许多的论题在标准内，例如对于互联网新开发的协议及发展中所有的记录。因此几乎所有的`互联网标准`都有收录在RFC文件之中。

`IETF`: `Internet Engineering Task Force`

ietf blog: <https://www.ietf.org/blog/>


## HTTP/1.1

> Hypertext Transfer Protocol -- HTTP/1.1
### RFC 2068
[ 1997 ] <https://tools.ietf.org/html/rfc2068> 

### RFC 2616
[ 1999 ] <https://tools.ietf.org/html/rfc2616>

### RFC 2965, 6265
> HTTP State Management Mechanism, like `cookie`
* [ 2000 ] <https://tools.ietf.org/html/rfc2965>
* [ 2011 ] <https://tools.ietf.org/html/rfc6265>


### RFC 7230
> Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and Routing
2014 <https://tools.ietf.org/html/rfc7230>

### RFC 7231
> Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content
[ 2014 ] <https://tools.ietf.org/html/rfc7231>

### RFC 7232
> Hypertext Transfer Protocol (HTTP/1.1): Conditional Requests
[ 2014 ] <https://tools.ietf.org/html/rfc7232>

### RFC 7233
> Hypertext Transfer Protocol (HTTP/1.1): Range Requests
[ 2014 ] <https://tools.ietf.org/html/rfc7233>

### RFC 7234
> Hypertext Transfer Protocol (HTTP/1.1): Caching
[ 2014 ] <https://tools.ietf.org/html/rfc7234>

### RFC 7235
> Hypertext Transfer Protocol (HTTP/1.1): Authentication
[ 2014 ] <https://tools.ietf.org/html/rfc7235>




## RFC 822
> STANDARD FOR THE FORMAT OF ARPA INTERNET TEXT MESSAGES
<https://tools.ietf.org/pdf/rfc822.pdf>

## RFC 2046
> Multipurpose Internet Mail Extensions (MIME) Part Two: Media Types
<https://www.ietf.org/rfc/rfc2046.txt>

## RFC 1341
> MIME  (Multipurpose Internet Mail Extensions): Mechanisms for Specifying and Describing the Format of Internet Message Bodies



The Multipart/alternative subtype

	From:  Nathaniel Borenstein <nsb@bellcore.com>
	To: Ned Freed <ned@innosoft.com>
	Subject: Formatted text mail
	MIME-Version: 1.0
	Content-Type: multipart/alternative; boundary=boundary42


	--boundary42
	Content-Type: text/plain; charset=us-ascii

	...plain text version of message goes here....

	--boundary42
	Content-Type: text/richtext

	.... richtext version of same message goes here ...
	--boundary42
	Content-Type: text/x-whatever

	.... fanciest formatted version of same  message  goes  here
	...
	--boundary42--


## RFC 2388
> Returning Values from Forms:  multipart/form-data
<https://www.ietf.org/rfc/rfc2388.txt>

## RFC 1867
> Form-based File Upload in HTML 
* ietf: <https://www.ietf.org/rfc/rfc1867.txt>
* local: <a href="./txt/rfc1867.txt">rfc1867.txt</a>


### html

     <form action="http://server.dom/cgi/handle"
           enctype="multipart/form-data"
           method=post>
     what is your name? <input type=text name=submitter>
     what files are you sending? <input type=file name=pics>
     </form>

### message 

* input 1: `Joe Blow`
* input 2: `file1.txt`
* message content:

		Content-type: multipart/form-data, boundary=AaB03x

		--AaB03x
		content-disposition: form-data; name="field1"

		Joe Blow
		--AaB03x
		content-disposition: form-data; name="pics"; filename="file1.txt"
		Content-Type: text/plain

		... contents of file1.txt ...
		--AaB03x--
	

* input 1: `Joe Blow`
* input 2: `file1.txt`, `file2.gif`
* message content

		Content-type: multipart/form-data, boundary=AaB03x

		--AaB03x
		content-disposition: form-data; name="field1"

		Joe Blow
		--AaB03x
		content-disposition: form-data; name="pics"
		Content-type: multipart/mixed, boundary=BbC04y

		--BbC04y
		Content-disposition: attachment; filename="file1.txt"
		Content-Type: text/plain

		... contents of file1.txt ...
		--BbC04y
		Content-disposition: attachment; filename="file2.gif"
		Content-type: image/gif
		Content-Transfer-Encoding: binary

		...contents of file2.gif...
		--BbC04y--
		--AaB03x--




