{

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      forAllSystems =
        function:
        nixpkgs.lib.genAttrs
          [
            "x86_64-linux"
            "aarch64-darwin"
          ]
          (
            system:
            let
              pkgs = nixpkgs.legacyPackages.${system};
            in
            function {
              inherit
                pkgs
                ;
            }
          );
    in
    {
      devShells = forAllSystems (
        {
          pkgs,
        }:
        {
          default = pkgs.mkShell {

            packages = with pkgs; [
              astro-language-server
              nodejs

              typescript-language-server
              typescript
            ];
          };

        }
      );

    };
}
