# gojs

> JavaScript diagramming library for interactive flowcharts, org charts, `design tools`, `planning tools`, visual languages.

## Resources

* site: <https://gojs.net>
* github: <https://github.com/NorthwoodsSoftware/GoJS> <iframe src="http://258i.com/gbtn.html?user=NorthwoodsSoftware&repo=GoJS&type=star&count=true" frameborder="0" scrolling="0" width="105px" height="20px"></iframe>
* get started: <https://gojs.net/latest/learn/>
* ` samples`: <https://gojs.net/latest/samples/index.html>
    * kanban <https://gojs.net/latest/samples/kanban.html>
    * BPMN Editor <https://gojs.net/latest/extensions/BPMN.html>
    * Floor Plan Editor <https://gojs.net/latest/extensions/FloorPlanEditor.html>


## Features

* `NorthwoodsSoftware`开发，但`不开源`
* 虽然不开源，但其`框架设计`是值得学习的，` API docs` - <https://gojs.net/latest/api/index.html>
* 是一个`综合的、大而全`的图形库，支持各类图形的展示、编辑、布局等
* 天生支持`编辑功能`，选择、删除、添加、移动、缩放等等，很适合制作`设计工具`
* 大量的官方Sample，非常参考价值，各类Editor示例使用的都是`canvas`技术，而不是svg技术
* `API设计`不太友好，偏复杂


## Install

    $ npm install gojs --save


## Demo


## API

### Diagram Classes

    Adornment
    AnimationManager
    CommandHandler
    Diagram
    DiagramEvent
    GraphObject
    Group
    InputEvent
    Layer
    Link
    Node
    Overview
    Palette
    Panel
    Part
    Picture
    Placeholder
    RowColumnDefinition
    Shape
    TextBlock

### Geometry Classes

    Brush
    Geometry
    Margin
    PathFigure
    PathSegment
    Point
    Rect
    Size
    Spot

### Model Classes

    Binding
    ChangedEvent
    GraphLinksModel
    Model
    Transaction
    TreeModel
    UndoManager

### Layout Classes

    CircularLayout
    ForceDirectedLayout
    GridLayout
    LayeredDigraphLayout
    Layout
    LayoutNetwork
    TreeLayout

### Tool Classes

    ActionTool
    ClickCreatingTool
    ClickSelectingTool
    ContextMenuTool
    DraggingTool
    DragSelectingTool
    HTMLInfo
    LinkingBaseTool
    LinkingTool
    LinkReshapingTool
    PanningTool
    RelinkingTool
    ResizingTool
    RotatingTool
    TextEditingTool
    Tool
    ToolManager

### Collection Classes

    Iterable
    Iterator
    List
    Map
    Set

    

