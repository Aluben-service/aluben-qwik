self.__uv$config = {
  prefix: "/~/uv/",
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "/uv/uv.handler.js",
  client: "/uv/uv.client.js",
  bundle: "/uv/uv.bundle.js",
  config: "/uv/uv.config.js",
  sw: "/uv/uv.sw.js",
  inject: [
    {
      host: "*://\*.discord.com/\*",
      injectTo: "head",
      html: "<script src=\"https://raw.githubusercontent.com/Vencord/builds/main/Vencord.user.js\"></script>"
    }
  ]
};
