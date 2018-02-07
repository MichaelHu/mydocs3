# bootstrap-insights


## Tips

* bootstrap 3使用`Less`编写，bootstrap 4使用`Sass`编写
* 本文针对bootstrap 4，`reactstrap`提供该版本的封装<ref://../react/reactstrap.md.html>
* bootstrap 4可对css和js部分进行自定义include，具体实现可以参考`hugeapp-apollo`项目
* 可以通过提供自己的`variables文件`对核心文件进行覆盖，而不是直接修改，对扩展开放
* 使用`components + utilities`架构


## css

    ▾ scss/
      ▾ mixins/
          _alert.scss
          _background-variant.scss
          _badge.scss
          _border-radius.scss
          _box-shadow.scss
          _breakpoints.scss
          _buttons.scss
          _caret.scss
          _clearfix.scss
          _float.scss
          _forms.scss
          _gradients.scss
          _grid-framework.scss
          _grid.scss
          _hover.scss
          _image.scss
          _list-group.scss
          _lists.scss
          _nav-divider.scss
          _navbar-align.scss
          _pagination.scss
          _reset-text.scss
          _resize.scss
          _screen-reader.scss
          _size.scss
          _table-row.scss
          _text-emphasis.scss
          _text-hide.scss
          _text-truncate.scss
          _transition.scss
          _visibility.scss
      ▾ utilities/
          _align.scss
          _background.scss
          _borders.scss
          _clearfix.scss
          _display.scss
          _embed.scss
          _flex.scss
          _float.scss
          _position.scss
          _screenreaders.scss
          _sizing.scss
          _spacing.scss
          _text.scss
          _visibility.scss
        _alert.scss
        _badge.scss
        _breadcrumb.scss
        _button-group.scss
        _buttons.scss
        _card.scss
        _carousel.scss
        _close.scss
        _code.scss
        _custom-forms.scss
        _dropdown.scss
        _forms.scss
        _functions.scss
        _grid.scss
        _images.scss
        _input-group.scss
        _jumbotron.scss
        _list-group.scss
        _media.scss
        _mixins.scss
        _modal.scss
        _nav.scss
        _navbar.scss
        _pagination.scss
        _popover.scss
        _print.scss
        _progress.scss
        _reboot.scss
        _root.scss
        _tables.scss
        _tooltip.scss
        _transitions.scss
        _type.scss
        _utilities.scss
        _variables.scss
        bootstrap-grid.scss
        bootstrap-reboot.scss
        bootstrap.scss


### Layout

### Utilities

#### border

    /* add borders */
    border
    border-top
    border-right
    border-bottom
    border-left

    /* remove borders */
    border-0
    border-top-0
    border-right-0
    border-bottom-0
    border-left-0

    /* set border color */
    border border-primary
    border border-secondary
    border border-success
    border border-danger
    border border-warning
    border border-info
    border border-light
    border border-dark
    border border-white

    /* set border radius */
    rounded
    rounded-top
    rounded-right
    rounded-bottom
    rounded-left
    rounded-circle
    rounded-0


#### clearfix

    clearfix
    @include clearfix;

#### colors

    /* text colors */
    text-primary
    text-secondary
    text-success
    text-danger
    text-warning
    text-info
    text-light
    text-dark
    text-muted
    text-white


    /* bg colors */
    bg-primary
    bg-secondary
    bg-success
    bg-danger
    bg-warning
    bg-info
    bg-light
    bg-dark
    bg-white

#### flex

    ...

#### float

    float-left
    float-right
    float-none
    float-sm-left
    float-sm-right
    float-sm-none
    float-md-left
    float-md-right
    float-md-none
    float-lg-left
    float-lg-right
    float-lg-none
    float-xl-left
    float-xl-right
    float-xl-none


#### position

    position-static
    position-relative
    position-absolute
    position-fixed
    position-sticky
    fixed-top
    fixed-bottom
    sticky-top


#### sizing

    w-25            width: 25%
    w-50
    w-75
    w-100
    mw-100          max-width: 100%
    h-25            height: 25%
    h-50
    h-75
    h-100


#### vertical align

    align-baseline
    align-top
    align-middle
    align-bottom
    align-text-top
    align-text-bottom


#### spacing

> 适用于所有的`断点`( breakpoints: xs, sm, md, lg, xl )，所以在spacing的类名中总是不包含断点名称[ 可能有些出入，todo ]

    {property}{sides}-{size}
    {property}{sides}-{breakpoint}-{size}

    // property
    m - margin
    p - padding

    // sides
    t - top
    b - bottom
    l - left
    r - right
    x - left and right
    y - top and bottom
    blank - 4 sides

    // size
    0 - 0
    1 - $spacer * .25
    2 - $spacer * .5
    3 - $spacer
    4 - $spacer * 1.5
    5 - $spacer * 3
    auto - margin auto







