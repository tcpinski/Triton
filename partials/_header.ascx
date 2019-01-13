<div class="container-fluid">

  <div class="row justify-content-center">
    <div id="TopBarPane" class="col-md-12 p-0" runat="server"></div>
  </div>
  
</div>

<header class="header-main" data-sticky="true">

    <div class="container">
      <div class="row justify-content-between align-items-center pl-2 pr-2 p-md-0">

        <h1 class="header-main__logo">
          <dnn:LOGO id="dnnLOGO" runat="server" />
        </h1>

        <nav id="nav-items" class="d-none d-md-block">
          <dnn:MENUDESKTOP id="menu" MenuStyle="menus/main" runat="server" NodeSelector="*"></dnn:MENUDESKTOP>
        </nav>

        <div class="mobile-toggle d-md-none"><i class="fas fa-bars"></i></div>

      </div>
    </div>

</header>

<dnn:MENUMOBILE id="menuMobile" MenuStyle="menus/mobile" runat="server" NodeSelector="*"></dnn:MENUMOBILE>