<footer class="bg-light-grey">
  <div class="container upper">
    <div class="row py-5">
      <div id="FooterPaneOne" class="col-md-4" runat="server"></div>
      <div id="FooterPaneTwo" class="col-md-4" runat="server"></div>
      <div id="FooterPaneThree" class="col-md-4" runat="server"></div>
    </div>
  </div>
  <div class="container-fluid bg-primary disclaimer">
    <div class="container">
      <ul>
        <li><dnn:COPYRIGHT id="dnnCopyright" runat="server" /></li>
      </ul>
    </div>
  </div>
</footer>

<script>
  /**
   * Page Speed
   */

  /* First CSS File */
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/Portals/_default/skins/triton/dist/css/style.min.css';
  link.type = 'text/css';
  var godefer = document.getElementsByTagName('link')[0];
  godefer.parentNode.insertBefore(link, godefer);

</script>