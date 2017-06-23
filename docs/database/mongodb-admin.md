# mongodb-admin

## Resources

* <http://docs.mongodb.org/manual/reference/command/nav-administration/>


## 常用命令

    Name                                Description
    ===============================================================
    renameCollection                    Changes the name of an existing collection.
    copydb                              Copies a database from a remote host to the current host.
    dropDatabase                        Removes the current database.
    listCollections                     Returns a list of collections in the current database.
    drop                                Removes the specified collection from the database.
    create                              Creates a collection and sets collection parameters.
    clone                               Copies a database from a remote host to the current host.
    cloneCollection                     Copies a collection from a remote host to the current host.
    cloneCollectionAsCapped             Copies a non-capped collection as a new capped collection.
    convertToCapped                     Converts a non-capped collection to a capped collection.
    filemd5                             Returns the md5 hash for files stored using GridFS.
    createIndexes                       Builds one or more indexes for a collection.
    listIndexes                         Lists all indexes for a collection.
    dropIndexes                         Removes indexes from a collection.
    fsync                               Flushes pending writes to the storage layer and locks the database to allow backups.
    clean                               Internal namespace administration command.
    connPoolSync                        Internal command to flush connection pool.
    connectionStatus                    Reports the authentication state for the current connection.
    compact                             Defragments a collection and rebuilds the indexes.
    collMod                             Add flags to collection to modify the behavior of MongoDB.
    reIndex                             Rebuilds all indexes on a collection.
    setParameter                        Modifies configuration options.
    getParameter                        Retrieves configuration options.
    repairDatabase                      Repairs any errors and inconsistencies with the data storage.
    repairCursor                        Returns a cursor that iterates over all valid documents in a collection.
    touch                               Loads documents and indexes from data storage to memory.
    shutdown                            Shuts down the mongod or mongos process.
    logRotate                           Rotates the MongoDB logs to prevent a single file from taking too much space.
    killOp                              Terminates an operation as specified by the operation ID.
    currentOp                           Returns a document that contains information on in-progress operations for the database instance.
    setFeatureCompatibilityVersion      Enables or disables MongoDB 3.4 features that persist data that are backwards-incompatible with MongoDB 3.2.
