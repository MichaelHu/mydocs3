# precss

> Use Sass-like markup in your CSS.

github: <https://github.com/jonathantneal/precss>


    $blue: #056ef0;
    $column: 200px;

    .menu {
      width: calc(4 * $column);
    }

    .menu_link {
      background: color-mod($blue alpha(90%));
      width: $column;
    }

    /* after */

    .menu {
      width: calc(4 * 200px);
    }

    .menu_link {
      background: #056ef0;
      width: 200px;
    }
