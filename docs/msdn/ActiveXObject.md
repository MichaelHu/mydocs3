# ActiveXObject

<https://msdn.microsoft.com/zh-cn/library/7sw4ddf8(v=vs.94).aspx> 


## COM/OLE查看器

## 一些可用组件

    WScript
    Excel.Application
    Excel.Chart
    Scripting.FileSystemObject
    WScript.Shell
    Word.Document

案例代码：

    // Make Excel visible through the Application object.
    ExcelSheet.Application.Visible = true;
    // Place some text in the first cell of the sheet.
    ExcelSheet.ActiveSheet.Cells(1,1).Value = "This is column A, row 1";
    // Save the sheet.
    ExcelSheet.SaveAs("C:\\TEST.XLS");
    // Close Excel with the Quit method on the Application object.
    ExcelSheet.Application.Quit();


## WSH

> Windows Script Host

refs: <https://msdn.microsoft.com/en-us/library/98591fh7(v=vs.84).aspx>

### 对象



