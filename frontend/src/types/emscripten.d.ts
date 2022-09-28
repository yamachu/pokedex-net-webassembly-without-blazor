// see: https://github.com/emscripten-core/emscripten/blob/18bc868cb5242e6816a4b3bde74b1e1dcd6fd818/src/library_fs.js#L93
export type FS = {
  filesystems: {
    IDBFS: IDBFS /** If .csproj contains <EmccExtraLDFlags>-lidbfs.js</EmccExtraLDFlags> */;
  };

  mount: (type: FileSystemType, opts: any, mountpoint: string) => any;
  syncfs: (
    populate: /** true: ? => FS, false: FS => ? */ boolean,
    callback: (e: any) => any
  ) => void;
};

interface IDBFS {}
type FileSystemType = IDBFS;
