# github

## 修改项目语言

* 默认使用`数量`最多的文件类型作为语言类型
* 通过修改`.gitattributes`文件，可以强制更改

修改方式如下：

    $ vim .gitattributes
    *.js linguist-language=Node
    *.css linguist-language=Node
    *.html linguist-language=Node





## 选择开源协议

* `github`提供了一个如何选择开源协议的站点，可供参考：<https://choosealicense.com>
* `阮一峰`老师也写了一篇相关文章：开源许可证教程 <http://www.ruanyifeng.com/blog/2017/10/open-source-license-tutorial.html>
* `知乎`上的专题：主流开源协议之间有何异同？<https://www.zhihu.com/question/19568896>

### 宽容许可证

* `基本特点`：没有使用限制；没有担保（不保证代码质量）；披露要求（用户必须披露原始作者）
* `npm init`时提供的默认`ISC`协议属于宽容许可证

常见的宽容许可证：

1. `MIT`协议，称为世上最为简洁和慷慨（permissive）的开源协议之一。比如JQuery，Rails等

2. `BSD`协议，与MIT差不多，也非常简单、慷慨。主要为：

    * `ISC`: <https://choosealicense.com/licenses/isc/>
    * `BSD 2-clause`: <https://choosealicense.com/licenses/bsd-2-clause/>
    * `BSD 3-clause`: <https://choosealicense.com/licenses/bsd-3-clause/>

3. `Apache 2`协议

    <https://choosealicense.com/licenses/apache-2.0/>，与MIT近似，区别主要在于Apache 2额外提供了一份简易的专利许可授权，明确禁止商标使用权以及要求明确指明所有修改过的文件。应用案例有：Apache家族、SVN、NuGet等。

### Copyleft许可证

常见的`Copyleft`许可证

* AGPL
* GPL
* LGPL
* Mozilla ( MPL )







## github pages

参考：<ref://./github-pages.md.html>

## github buttons

参考：<ref://./github-buttons.md.html>

## github open api

* 每个开放接口返回`JSON格式`的内容
* 接口都支持`jsonp`协议，通过`callback参数`提供回调函数
* `api.github.com`接口能返回常用接口地址或地址模板
* 比如`https://api.github.com/repos/{owner}/{repo}`接口可以返回对应用户仓库的信息，包括Star、Follow、Fork等数据，只需提供`owner`和`repo`参数

以下显示接口返回数据：

    $ curl https://api.github.com
    {
      "current_user_url": "https://api.github.com/user",
      "current_user_authorizations_html_url": "https://github.com/settings/connections/applications{/client_id}",
      "authorizations_url": "https://api.github.com/authorizations",
      "code_search_url": "https://api.github.com/search/code?q={query}{&page,per_page,sort,order}",
      "commit_search_url": "https://api.github.com/search/commits?q={query}{&page,per_page,sort,order}",
      "emails_url": "https://api.github.com/user/emails",
      "emojis_url": "https://api.github.com/emojis",
      "events_url": "https://api.github.com/events",
      "feeds_url": "https://api.github.com/feeds",
      "followers_url": "https://api.github.com/user/followers",
      "following_url": "https://api.github.com/user/following{/target}",
      "gists_url": "https://api.github.com/gists{/gist_id}",
      "hub_url": "https://api.github.com/hub",
      "issue_search_url": "https://api.github.com/search/issues?q={query}{&page,per_page,sort,order}",
      "issues_url": "https://api.github.com/issues",
      "keys_url": "https://api.github.com/user/keys",
      "notifications_url": "https://api.github.com/notifications",
      "organization_repositories_url": "https://api.github.com/orgs/{org}/repos{?type,page,per_page,sort}",
      "organization_url": "https://api.github.com/orgs/{org}",
      "public_gists_url": "https://api.github.com/gists/public",
      "rate_limit_url": "https://api.github.com/rate_limit",
      "repository_url": "https://api.github.com/repos/{owner}/{repo}",
      "repository_search_url": "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}",
      "current_user_repositories_url": "https://api.github.com/user/repos{?type,page,per_page,sort}",
      "starred_url": "https://api.github.com/user/starred{/owner}{/repo}",
      "starred_gists_url": "https://api.github.com/gists/starred",
      "team_url": "https://api.github.com/teams",
      "user_url": "https://api.github.com/users/{user}",
      "user_organizations_url": "https://api.github.com/user/orgs",
      "user_repositories_url": "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}",
      "user_search_url": "https://api.github.com/search/users?q={query}{&page,per_page,sort,order}"
    }

