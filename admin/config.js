// This is a workaround for the "Cannot read properties of undefined (reading 'toArray')" error
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

// Register the uploadcare widget
CMS.registerMediaLibrary({
  name: 'uploadcare',
  config: {
    publicKey: 'demopublickey', // Replace with your actual Uploadcare public key
    multiple: true
  }
});