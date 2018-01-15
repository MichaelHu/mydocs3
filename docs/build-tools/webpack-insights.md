# webpack insights

## Resources

* github: <https://github.com/webpack/webpack>

## Features

* `lib/`目录下存放`核心代码`、内建实现的`Plugin`等


## Tips

### hash与chunkhash

> webpack v3.10.0

关于`output.filename`的template变量，在<https://webpack.js.org/configuration/output/#output-filename>有如下描述：

    [hash]       The hash of the module identifier
    [chunkhash]  The hash of the chunk content
    [name]       The module name
    [id]         The module identifier
    [query]      The module query, i.e., the string following ? in the filename

其中`[hash]`模板变量的说明，具有误导性，乍一看以为是`module id`的hash值，实则不然。分析`TemplatedPathPlugin.js`中如下代码：

    const replacePathVariables = ( path, data ) => {
        // 测试：输出data
        console.log( data );
        const chunk = data.chunk;
        const chunkId = chunk && chunk.id;
        const chunkName = chunk && (chunk.name || chunk.id);
        const chunkHash = chunk && (chunk.renderedHash || chunk.hash);
        const chunkHashWithLength = chunk && chunk.hashWithLength;

        if(data.noChunkHash && REGEXP_CHUNKHASH_FOR_TEST.test(path)) {
            throw new Error(`Cannot use [chunkhash] for chunk in '${path}' (use [hash] instead)`);
        }

        return path
            .replace(REGEXP_HASH, withHashLength(getReplacer(data.hash), data.hashWithLength))
            .replace(REGEXP_CHUNKHASH, withHashLength(getReplacer(chunkHash), chunkHashWithLength))
            .replace(REGEXP_ID, getReplacer(chunkId))
            .replace(REGEXP_NAME, getReplacer(chunkName))
            .replace(REGEXP_FILE, getReplacer(data.filename))
            .replace(REGEXP_FILEBASE, getReplacer(data.basename))
            // query is optional, it's OK if it's in a path but there's nothing to replace it with
            .replace(REGEXP_QUERY, getReplacer(data.query, true));
    }

该代码是实现`输出路径拼装`逻辑的，我们将其中的data在命令行中输出（如上注释处），数据结构如下：

    { noChunkHash: false,
      chunk:
       Chunk {
         id: 0,
         ids: [ 0 ],
         debugId: 1000,
         name: 'main',
         _modules:
          SortableSet {
            [Object],
            _sortFn: [Function: sortByIdentifier],
            _lastActiveSortFn: [Function: sortById] },
         entrypoints: [ [Object] ],
         chunks: [],
         parents: [],
         blocks: [],
         origins: [ [Object] ],
         files: [],
         rendered: true,
         entryModule:
          NormalModule {
            dependencies: [Object],
            blocks: [],
            variables: [],
            context: '/Users/hudamin/projects/git/hugeapp-apollo/src',
            reasons: [],
            debugId: 1000,
            id: 0,
            portableId: 'node_modules/babel-loader/lib/index.js??ref--0!src/index.js',
            index: 0,
            index2: 0,
            depth: 0,
            used: true,
            usedExports: true,
            providedExports: true,
            _chunks: [Object],
            _chunksDebugIdent: undefined,
            warnings: [],
            dependenciesWarnings: [],
            errors: [],
            dependenciesErrors: [],
            strict: true,
            meta: {},
            optimizationBailout: [],
            request: '/Users/hudamin/projects/git/hugeapp-apollo/node_modules/babel-loader/lib/index.js??ref--0!/Users/hudamin/projects/git/hugeapp-apollo/src/index.js',
            userRequest: '/Users/hudamin/projects/git/hugeapp-apollo/src/index.js',
            rawRequest: './src/index.js',
            parser: [Object],
            resource: '/Users/hudamin/projects/git/hugeapp-apollo/src/index.js',
            loaders: [Object],
            fileDependencies: [Object],
            contextDependencies: [],
            error: null,
            _source: [Object],
            assets: {},
            built: true,
            _cachedSource: [Object],
            issuer: null,
            building: undefined,
            buildTimestamp: 1516020335649,
            cacheable: true },
         //  chunkhash
         hash: 'f1eaa2ad7ef831ceeafcfa2deafbc45b',
         renderedHash: 'f1eaa2ad7ef831ceeafc' },
      //  hash
      hash: '6b72e3ca91e97718161c' }

* `data.chunk.hash`或`data.chunk.renderedHash`代表`chunkhash`；而`data.hash`代表`hash`
* chunkhash`不一定`是entry，有很多`non-entry`的chunk；而entry`一定`是chunk
* chunkhash基于chunk`内容`；hash不仅考虑内容，而且还考虑了`编译`等信息，它来自`fullHash`

        // Compilation.js:createHash() 
        ...
        this.fullHash = hash.digest(hashDigest);
		this.hash = this.fullHash.substr(0, hashDigestLength);
        ...

        // Chunk.js:getChunkMaps(includeInitial, realHash)
        ...
        chunkHashMap[chunk.id] = realHash ? chunk.hash : chunk.renderedHash;
        ...

* 使用id后接chunkhash，与使用name后接chunkhash，两者的chunkhash不一致；hash也有一样的特性：

        [id]_[chunkhash:7].js       0_5b59949.js
        [name]_[chunkhash:7].js     main_f1eaa2a.js
        [id]_[hash:7].js            0_8519b27.js
        [name]_[hash:7].js          main_3595349.js

    疑问：以上表现可见chunkhash也不是单纯的只依赖其`输出内容`，。

* 其他参考：
    * Webpack中hash与chunkhash的区别，以及js与css的hash指纹解耦方案 <http://www.cnblogs.com/ihardcoder/p/5623411.html>
    * `extract-text-webpack-plugin`插件所支持的`[contenthash]`模板变量能真正体现抽取出的css文件的内容指纹

            
    



    


## lib/

### AmdMainTemplatePlugin.js
### APIPlugin.js
### AsyncDependenciesBlock.js
### AsyncDependencyToInitialChunkWarning.js
### AutomaticPrefetchPlugin.js
### BannerPlugin.js
### BasicEvaluatedExpression.js
### CachePlugin.js
### CaseSensitiveModulesWarning.js
###  Chunk.js
### ChunkRenderError.js
### ChunkTemplate.js
### compareLocations.js
### CompatibilityPlugin.js
###  Compilation.js

    class Compilation
        getStats()
        templatesPlugin( name, fn )
        addModule(module, cacheGroup)
        getModule(module)
        ...
    	getPath(filename, data)
        ...

###  Compiler.js
### ConstPlugin.js
### ContextExclusionPlugin.js
### ContextModule.js
### ContextModuleFactory.js
### ContextReplacementPlugin.js
### DefinePlugin.js
### DelegatedModule.js
### DelegatedModuleFactoryPlugin.js
### DelegatedPlugin.js
### DependenciesBlock.js
### DependenciesBlockVariable.js
### Dependency.js
### DllEntryPlugin.js
### DllModule.js
### DllModuleFactory.js
### DllPlugin.js
### DllReferencePlugin.js
### DynamicEntryPlugin.js
### EntryModuleNotFoundError.js
### EntryOptionPlugin.js
### Entrypoint.js
### EnvironmentPlugin.js
### ErrorHelpers.js
### EvalDevToolModulePlugin.js
### EvalDevToolModuleTemplatePlugin.js
### EvalSourceMapDevToolModuleTemplatePlugin.js
### EvalSourceMapDevToolPlugin.js
### ExportPropertyMainTemplatePlugin.js
### ExtendedAPIPlugin.js
### ExternalModule.js
### ExternalModuleFactoryPlugin.js
### ExternalsPlugin.js
### FlagDependencyExportsPlugin.js
### FlagDependencyUsagePlugin.js
### FlagInitialModulesAsUsedPlugin.js
### formatLocation.js
### FunctionModulePlugin.js
### FunctionModuleTemplatePlugin.js
### HashedModuleIdsPlugin.js
### HotModuleReplacement.runtime.js
### HotModuleReplacementPlugin.js
### HotUpdateChunkTemplate.js
### IgnorePlugin.js
### JsonpChunkTemplatePlugin.js
### JsonpExportMainTemplatePlugin.js
### JsonpHotUpdateChunkTemplatePlugin.js
### JsonpMainTemplate.runtime.js
### JsonpMainTemplatePlugin.js
### JsonpTemplatePlugin.js
### LibManifestPlugin.js
### LibraryTemplatePlugin.js
### LoaderOptionsPlugin.js
### LoaderTargetPlugin.js
### MainTemplate.js
### MemoryOutputFileSystem.js
### Module.js
### ModuleBuildError.js
### ModuleDependencyError.js
### ModuleDependencyWarning.js
### ModuleError.js
### ModuleFilenameHelpers.js
### ModuleNotFoundError.js
### ModuleParseError.js
### ModuleReason.js
### ModuleTemplate.js
### ModuleWarning.js
### MovedToPluginWarningPlugin.js
### MultiCompiler.js
### MultiEntryPlugin.js
### MultiModule.js
### MultiModuleFactory.js
### MultiStats.js
### MultiWatching.js
### NamedChunksPlugin.js
### NamedModulesPlugin.js
### NewWatchingPlugin.js
### NodeStuffPlugin.js
### NoEmitOnErrorsPlugin.js
### NoErrorsPlugin.js
### NormalModule.js
### NormalModuleFactory.js
### NormalModuleReplacementPlugin.js
### NullFactory.js
### OptionsApply.js
### OptionsDefaulter.js
### Parser.js
### ParserHelpers.js
### PrefetchPlugin.js
### prepareOptions.js
### ProgressPlugin.js
### ProvidePlugin.js
### RawModule.js
### RecordIdsPlugin.js
### removeAndDo.js
### RequestShortener.js
### RequireJsStuffPlugin.js
### RuleSet.js
### SetVarMainTemplatePlugin.js
### SingleEntryPlugin.js
### SizeFormatHelpers.js
### SourceMapDevToolModuleOptionsPlugin.js
### SourceMapDevToolPlugin.js
### Stats.js
### Template.js
###  TemplatedPathPlugin.js

    withHashLength( replacer, handerFn )
    getReplacer( value, allowEmpty )
    replacePathVariables( path, data )
    TemplatedPathPlugin()

### UmdMainTemplatePlugin.js
### UnsupportedFeatureWarning.js
### UseStrictPlugin.js
### validateSchema.js
### WarnCaseSensitiveModulesPlugin.js
### WatchIgnorePlugin.js
### webpack.js
### webpack.web.js
### WebpackError.js
### WebpackOptionsApply.js
### WebpackOptionsDefaulter.js
### WebpackOptionsValidationError.js


