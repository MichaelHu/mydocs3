# drag-and-drop

> DND - from html `5.1`


## Resources

* w3c - `html5.1` - `Drag and drop`: <https://www.w3.org/TR/html5/editing.html#drag-and-drop>
* demo: <https://html5demos.com/drag/>
* Apple Developer Center: <https://developer.apple.com/documentation/uikit/drag_and_drop>


## Features



## draggable attributes

* 设置dom元素的`draggable`属性，以支持DND
        el.setAttribute( 'draggable', 'true' );
* `<img>`以及带有`href`属性的`<a>`，默认情况下`draggable`为true



## events

    name        target          cancelable      drag data store mode
    ===========================================================================
    dragstart   source node     yes             read/write
    drag        source node     yes             protected
    dragenter                   yes             protected
    dragexit                                    protected
    dragleave                                   protected
    dragover                    yes             protected
    drop                        yes             read-only
    dragend                                     protected

## drag data store

    e.dataTransfer

### APIs

    dataTransfer.dropEffect[ = value ]
    dataTransfer.effectAllowed[= value ]
    dataTransfer.items
    dataTransfer.setDragImage( element, x, y )
    dataTransfer.types
    data = dataTransfer.getData( format )
    dataTransfer.setData( format, data )
    dataTransfer.clearData( [ format ] )
    dataTransfer.files

    items.length
    items[ index ]
    items.remove( index )
    items.clear()
    items.add( data )
    items.add( data, type )

    item.kind
    item.type
    item.getAsString( callback )
    file = item.getAsFile()



### interfaces

    [Constructor( DOMString type, optional DragEventInit eventInitDict ) ]
    interface DragEvent: MouseEvent {
        readonly attribute DataTransfer? dataTransfer;
    };

    dictionary DragEventInit: MouseEventInit {
        DataTransfer? dataTransfer = null;
    };

    interface DataTransfer {
        // none, copy, link, move
        attribute DOMString dropEffect;
        // none, copy, copyLink, copyMove, link, linkMove, move, all, uninitialized
        attribute DOMString effectAllowed;

        [SameObject] readonly attribute DataTransferItemList items;
        void setDragImage( Element image, long x, long y );

        /* old interface */
        [SameObject] readonly attribute DOMString[] types;
        DOMString getData( DOMString format );
        void setData( DOMString format, DOMString data );
        void clearData( optional DOMString format );
        [SameObject] readonly attribute FileList files;
    };

    interface DataTransferItemList {
        readonly attribute unsigned long length;
        getter DataTransferItem( unsigned long index );
        DataTransferItem? add( DOMString data, DOMString type );
        DataTransferItem? add( File data );
        void remove( unsigned long index );
        void clear();
    };

    interface DataTransferItem {
        readonly attribute DOMString kind;
        readonly attribute DOMString type;
        void getAsString( FunctionStringCallback? _callback );
        File? getAsFile();
    };

    callback FunctionStringCallback = void( DOMString data );





