--- 
title: "The beauty of Nix"
author: "Moskas"
date: "12 Nov 2024 23:05:01"
tags: ["Nix"]
---

In the summer of 2023 I&rsquo;ve converted my main desktop to NixOS after using it for around half a year on my laptop. At the same time I have converted my configs to flakes and that change made me even more hooked with nix&rsquo;s ecosystem. 

# Write once, use everywhere

OK, that might be an overstatement but the ease of creating a configuration file for something like your editor of choice or terminal is amazing in it&rsquo;s own regard. On top of that with nix we have the ability to reuse that code in other configurations such as multiple PCs.  
That is one of the reasons I&rsquo;ve decided to switch all my personal devices to NixOS because it&rsquo;s much easier to keep them in sync with all the packages and configurations.  
At the moment I&rsquo;ve got 2 desktops, a laptop and a WSL hosts configured in a single configuration repository. It&rsquo;s really nice to have a single point of reference in your configurations as it helps with remembering what has been changed and added on top of the ability to deduplicate configs.  

# Flakes

It&rsquo;s an *&ldquo;experimental&rdquo;* feature that&rsquo;s basically a defacto standard by now if you browse user configs and software made for nix. In a very simple terms it&rsquo;s a way to define **inputs** and **outputs** of a configuration/package/shell. *(I&rsquo;ve ommited some possible outputs to keep it simple)*  
A simplest flake is that is part of nix cli interface can be created using the following command:  
```
~   nix flake init
```
The command is similar in syntax to git command.  
And here is the result:  
```nix
{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }: {

    packages.x86_64-linux.hello = nixpkgs.legacyPackages.x86_64-linux.hello;

    packages.x86_64-linux.default = self.packages.x86_64-linux.hello;

  };
}
```
It&rsquo;s a simple flake that takes **nixos-unstable** repo as it&rsquo;s input and produces single package called **hello** that is the default output of the function. Here is the output if we run the flake:  
```bash
 ~/temp   nix run .
warning: creating lock file '/home/moskas/temp/flake.lock'
Hello, world!
```
As we can see it run the **hello** package after creating the **flake.lock** file that stores all the hashes and information about the inputs in order to reproduce it in the exact same way with exactly the same package version.  
Here is the metadata for the flake as I&rsquo;m writing now:  
```bash
 ~/temp   nix flake metadata
Resolved URL:  path:/home/moskas/temp
Locked URL:    path:/home/moskas/temp?lastModified=1708961028&narHash=sha256-F520/ukJCbgQkzMjje%2B/32/e9K3NYP12MBND9fCW9jw%3D
Description:   A very basic flake
Path:          /nix/store/vy96pawpm96bmsziv7bswmi6m0cbdf88-source
Last modified: 2024-02-26 16:23:48
Inputs:
└───nixpkgs: github:nixos/nixpkgs/73de017ef2d18a04ac4bfd0c02650007ccb31c2a
```

# Module system

Thanks to the fact that your system is in fact just a bunch of text written in actual functional programming language makes it much more expendable than any bash scripts, gnu stow or ansible can ever achieve. *At least in my opinion*  
I&rsquo;ll give some examples of what I mean by that.  

## Home-manager

The most obvious one in my opinion. It provides module to write configuration for many applications such as zsh, newsboat, kitty, Firefox and many many more.  
With simple nix syntax we can write a zsh config with syntax highlighting and completions, shell aliases, etc:  
```nix
programs.zsh = {
  enable = true;
  shellAliases = { e = "$EDITOR"; };
  history = {
    size = 10000;
    path = "${config.xdg.dataHome}/zsh/history";
  };
  enableAutosuggestions = true;
  syntaxHighlighting.enable = true;
  autocd = false;
  defaultKeymap = "emacs";
  plugins = [ ];
}
```
Just by looking at the code above we can infer what it will do and it&rsquo;s easy to use across multiple hosts.  
I&rsquo;ve used home-manager heavily in my config and I can&rsquo;t see myself not using it in the future.  

## sops-nix and agenix - secret management

Links:  

-   [sops-nix](https://github.com/Mic92/sops-nix)
-   [agenix](https://github.com/ryantm/agenix)

These modules solve exactly the same problem, they allow you to declare all of your secrets within nix code. You can use them for everything related to passwords, ssh keys and any other authorisation that is stored in plain text.  
With that you can declare all of your secrets without worrying that they are stored in the plain text in your repo as they are encrypted using **sops** and **age** hence the names of the modules.  
Of course they differ in the way they are declared and created, here is an example agenix declaration for adding ssh keys:  
```nix
let
  user1 = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIL0idNvgGiucWgup/mP78zyC23uFjYq0evcWdjGQUaBH";
  user2 = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILI6jSq53F/3hEmSs+oq9L4TwOo1PrDMAgcA1uo1CCV/";
  users = [ user1 user2 ];

  system1 = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPJDyIr/FSz1cJdcoW69R+NrWzwGK/+3gJpqD1t8L2zE";
  system2 = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKzxQgondgEYcLpcPdJLrTdNgZ2gznOHCAxMdaceTUT1";
  systems = [ system1 system2 ];
in
{
  "secret1.age".publicKeys = [ user1 system1 ];
  "secret2.age".publicKeys = users ++ systems;
}
```
In both solutions we are holders of the decryption keys and we can basically fearlesly share the nix code without worrying that somebody else will use it agains us and we&rsquo;ll store the decryption keys elswhere preferably offline for security reasons.  
That also gives us a better way to manage and change the secrets on all of our machines if we ever need to.  

## disko

It&rsquo;s a module that allows you to declaratively configure your disks during the install/reinstall. Basically it streamlines the process of creating partitions, mounting them and setting them up with parameters using nix language. It can get quite verbose in the config but once you have written it it&rsquo;s just one command to format all of your drive/s in one command. For instance here is my configuration for my homeserver:  
```nix
{
  disko.devices = {
    disk = {
      vda = {
        device = "/dev/sda";
        type = "disk";
        content = {
          type = "gpt";
          partitions = {
            ESP = {
              type = "EF00";
              size = "500M";
              content = {
                type = "filesystem";
                format = "vfat";
                mountpoint = "/boot";
              };
            };
            root = {
              size = "100%";
              content = {
                type = "btrfs";
                extraArgs = [ "-f" ];
                subvolumes = {
                  "/rootfs" = { mountpoint = "/"; };
                  "/home" = {
                    mountOptions = [ "compress=zstd" ];
                    mountpoint = "/home";
                  };
                  "/nix" = {
                    mountOptions = [ "compress=zstd" "noatime" ];
                    mountpoint = "/nix";
                  };
                  "/swap" = {
                    mountpoint = "/.swapvol";
                    swap = { swapfile.size = "8G"; };
                  };
                  "/media" = {
                    mountpoint = "/media";
                    mountOptions = [ "compress=zstd" ];
                  };
                };
                mountpoint = "/partition-root";
                swap = { swapfile = { size = "8G"; }; };
              };
            };
          };
        };
      };
    };
  };
}
```
In that one file I&rsquo;ve configured my whole disk to run using btrfs with subvolumes and fat32 as boot.  
```bash
 ~   lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0 931,5G  0 disk
├─sda1   8:1    0   500M  0 part /boot
└─sda2   8:2    0   931G  0 part /home
                                 /media
                                 /.swapvol
                                 /partition-root
                                 /nix/store
                                 /nix
                                 /

 ~   sudo btrfs subvolume list /
ID 256 gen 2156 top level 5 path home
ID 257 gen 2151 top level 5 path media
ID 258 gen 2156 top level 5 path nix
ID 259 gen 2156 top level 5 path rootfs
ID 260 gen 18 top level 5 path swap
```
It&rsquo;s only a small example of what it can do, when you combine the disko with impermanence it gets much better because you can declaratively rebuild your filesystem on each reboot.  

## nixvim

With nixvim we can configure our neovim using nix. We can configure basically all of the core functionality using nixvim, LSPs, neovim options, plugins etc.  
I&rsquo;ve written [my own configuration](https://github.com/Moskas/nixvim-config) using nixvim and I really enjoyed it. I always got thrown away with all of the possible package managers and configuration options in neovim but with nixvim it was a breeze.  
Additionally with nixvim we can share our configurations without the need of installing them in **~/.config/neovim** so everyone can test it out without permanently installing it or overwriting own configuration.  
Here is a small example of neovim configuration with nixvim that installs colorscheme, statusline(lualine) and lsp for Rust:  
```nix
programs.nixvim = {
    enable = true;
    colorschemes.gruvbox.enable = true;
    plugins = {
      lualine = {
        enable = true;
        componentSeparators = {
          left = "|";
          right = "|";
        };
        sectionSeparators = {
          left = "";
          right = "";
        };
      };
      lsp = {
       enable = true;
       servers = {
         rust-analyzer = {
            enable = true;
            installRustc = true;
            installCargo = true;
         };
       };
      };
    };
};
```

## nix-colors

Have you ever wanted to have everything in your system configured with one colorscheme and easily swap between them if you ever wanted to? Nix-colors have you covered in that regard. It&rsquo;s not all sunshine and rainbow as it requires some configuration for each application but it&rsquo;s one time job with use of it&rsquo;s variables.  
For instance here is a code for generating `.Xresources` file using defined colorscheme:  

    { config, nix-colors, ... }:
    
    {
      imports = [
        nix-colors.homeManagerModules.default
      ];
    
      colorScheme = nix-colors.colorSchemes.gruvbox-dark-medium;
    
      xresources = {
        properties = {
          "*foreground" = "#${config.colorScheme.palette.base06}";
          "*background" = "#${config.colorScheme.palette.base00}";
          "*color0" = "#${config.colorScheme.palette.base03}";
          "*color1" = "#${config.colorScheme.palette.base08}";
          "*color2" = "#${config.colorScheme.palette.base0B}";
          "*color3" = "#${config.colorScheme.palette.base0A}";
          "*color4" = "#${config.colorScheme.palette.base0D}";
          "*color5" = "#${config.colorScheme.palette.base0E}";
          "*color6" = "#${config.colorScheme.palette.base0C}";
          "*color7" = "#${config.colorScheme.palette.base06}";
          "*color8" = "#${config.colorScheme.palette.base03}";
          "*color9" = "#${config.colorScheme.palette.base08}";
          "*color10" = "#${config.colorScheme.palette.base0B}";
          "*color11" = "#${config.colorScheme.palette.base0A}";
          "*color12" = "#${config.colorScheme.palette.base0D}";
          "*color13" = "#${config.colorScheme.palette.base0E}";
          "*color14" = "#${config.colorScheme.palette.base0C}";
          "*color15" = "#${config.colorScheme.palette.base07}";
        };
      };
    }

With that example we use nix-colors to generate base16 colorscheme using gruvbox dark with medium variant.  
Ideally you&rsquo;ll import the nix-colors module and set the `colorScheme` variable in your main home-manager config but for the sake of completion I&rsquo;ve included them in the example.  

## There is more

I&rsquo;ve only list some of the available modules, that&rsquo;s not even all I&rsquo;ve got in my configurations but I guess you can see the point already. It&rsquo;s truly extensible some much work out of your way.  

# Dev environments

If you are reading this you might be involved with creating some code or software, maybe even doing it in a team. What if you could create a reproducible dev environment with tools, secrets and tools that are needed in order to develop your project? Nix allows that and it&rsquo;s much better than docker or ansible playbook can ever achive with less friction.  
For instance you are a Rust developer and you want to have a project that anyone that who will download your is ready to go to commit new changes with all the tools with the exact same versions as yours? Nix allows exactly that.  
Here is a sample configuration for Rust dev environment that I use:  

    {
      description = "Rust dev flake";
    
      inputs = {
        nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
        naersk.url = "github:nix-community/naersk";
        flake-utils.url = "github:numtide/flake-utils";
      };
      outputs = { self, flake-utils, naersk, nixpkgs }:
        flake-utils.lib.eachDefaultSystem (system:
          let
            pkgs = (import nixpkgs) { inherit system; };
            naersk' = pkgs.callPackage naersk { };
    
          in rec {
            defaultPackage = naersk'.buildPackage { src = ./.; };
    
            devShell = pkgs.mkShell {
              buildInputs = with pkgs; [
                rustc
                cargo
                rust-analyzer
                rustPackages.clippy
                rustfmt
              ];
            };
          });
    }

With that piece of code we have a dev shell with `rustc, cargo, rust-analyzer, clippy and rustfmt` all ready to go. Now it&rsquo;s just a matter of simply running one command:  

    nix develop .

And with that our shell gets created with `flake.lock` file that stores all metadata regarding the installed packages with their versions.  
On top of that by using naersk flake input we are able to use and automate package building using nix. Now instead of running the following command:  

    cargo build --release

We can just use:  

    nix build .

That might not be a huge life saving change at first but when we dive deeper we now realise that thanks to that change we already have a way to package and ship the application with nix without any additional work.  
I&rsquo;ve used naersk flake in my own projects such as [whdl](https://github.com/Moskas/whdl) and I can run that application without installing it:  

     ~   nix run github:Moskas/whdl -- --help
    
    Wallhaven.cc wallpaper downloader
    
    Usage: whdl [OPTIONS] --query <QUERY>
    
    Options:
      -q, --query <QUERY>              The query to search on wallhaven.cc
      -r, --ratios <RATIOS>            Set the image ratios
      -i, --iresolution <IRESOLUTION>  Set the exact image resolution
      -m, --mresolution <MRESOLUTION>  Set the minimal image resolution
      -p, --purity <PURITY>            Set the purity sfw/sketchy/nsfw
      -c, --category <CATEGORY>        Set the category general/anime/people
      -s, --sorting <SORTING>          Set the sorting of the results
      -a, --ai-filter <AI_FILTER>      Set the AI art filter [possible values: true, false]
      -o, --order <ORDER>              Set the sorting order [default: desc]
      -e, --exact-page <EXACT_PAGE>    Set the exact page to request and download
      -h, --help                       Print help
      -V, --version                    Print version

The command **will take some time** as it has to download and compile the application from source but it&rsquo;s available straight from shell without being added to the $PATH.  
If we want we can create one off shell the same way, just replace **run** with **shell**:  

     ~   nix shell github:Moskas/whdl
     ~   whdl -V
    whdl 1.1

# Making packages

The example with dev env basically had a way to package Rust application but it&rsquo;s not the only way to do it. We can easily create package recipes kinda like Arch and it&rsquo;s MAKEPKG. Let&rsquo;s get back to my whdl app to package it we need to create a package file as follows:  

    { lib, stdenv, fetchFromGitHub, rustPlatform, cmake, pkg-config, zlib, libiconv
    , openssl }:
    
    rustPlatform.buildRustPackage rec {
      pname = "whdl";
      version = "0.1.1";
    
      src = fetchFromGitHub {
        owner = "Moskas";
        repo = "whdl";
        rev = "e23f3ef0e52c144039e669726835a43507e8b2cf";
        hash = "sha256-snV/jTn6YagfYH+u7YJB0R5tUQWg5D5UQQPZtjzbQR8=";
      };
    
      cargoHash = "sha256-K/buXR7JjMC+XHV5K9ikMz8H8RhK6OQ/hF8iNI8BhMI=";
    
      nativeBuildInputs = [ cmake pkg-config openssl ];
      buildInputs = [ openssl ];
    
      meta = with lib; {
        description = "wallhaven.cc batch downloader written in Rust";
        longDescription = ''
          Simple wallhaven.cc wallpaper downloader written in Rust.
        '';
        homepage = "https://github.com/Moskas/whdl";
        license = licenses.mit;
        mainProgram = "whdl";
        maintainers = with maintainers; [ Moskas ];
        platforms = platforms.unix;
      };
    }

That&rsquo;s the whole code for the packaged, we define source that is my repo with exact commit hash and sha256 generated by nix, additionally we write cargoHash for our Cargo.lock file that is also generated by nix. As this application requires openssl to connect with external https api we add openssl and pkg-config as our buildInputs on top of what rust needs to compile the binary.  
What about Python?  
It&rsquo;s almost the same, here is my package for epy cli epub reader:  

    { lib, python311Packages, fetchFromGitHub, pkgs }:
    
    python311Packages.buildPythonApplication rec {
      pname = "epy";
      version = "v2023.6.11";
      format = "pyproject";
    
      src = fetchFromGitHub {
        owner = "wustho";
        repo = "epy";
        rev = "6b0e9fe0773f05fdf844b574f0f28df3961f60ab";
        hash = "sha256-nUccxSg2sp4FVReQhfx/R8EC9KuzoBuH8JsWKwrGiSQ=";
      };
    
      nativeBuildInputs = [ pkgs.python311Packages.poetry-core ];
    
      meta = with lib; {
        description = "CLI Epub Reader";
        homepage = "https://github.com/wustho/epy";
        license = licenses.gpl3;
        maintainers = [ ];
        platforms = platforms.all;
      };
    }

Of course not everything can be easily package, some things require some hacks for instance we have a C++ project that in the process of using `make` downloads additional python binaries for testing. That won&rsquo;t be that easy to package due to NixOS&rsquo;s design choice of not following FHS of Linux distros.  

# Modifying packages

Nix and NixOS might look like a typical binary distribution distro but actually it is source based distribution that uses binary cache by default. We can disable usage of binary cache in nix configuration:  

    nix.settings.builders-use-substituters = false;

With that Nix will build everything from source using nixpkgs package recipes. Just like it did with my package of whdl in the earlier bullet point.  
So by the fact that every package is just a recipe and it is all written in a programming language we can modify it and overwrite packages to our heart contents. Want to change version of a package or apply some patch to the source code? Sure you can do it.  
Here is example that I&rsquo;m using in my config, I&rsquo;ve patched tmux plugin of catppuccin colorscheme to match my colors but I keep everything else like it is in the original package.  
First of all here is the nix override code:  

    # Keep in mind it's a part of my home-manager config /add link here/
    plugin = (pkgs.tmuxPlugins.catppuccin.overrideAttrs
      (o: { patches = (o.patches or [ ]) ++ [ ./catppuccin.patch ]; }));

This code just gets the .patch file from the same directory as the tmux declaration.  
It&rsquo;s regular patch diff:  

    diff --git a/catppuccin-mocha.tmuxtheme b/catppuccin-mocha.tmuxtheme
    index 41e6369..e81b97b 100644
    --- a/catppuccin-mocha.tmuxtheme
    +++ b/catppuccin-mocha.tmuxtheme
    @@ -1,17 +1,17 @@
     # NOTE: you can use vars with $<var> and ${<var>} as long as the str is double quoted: ""
     # WARNING: hex colors can't contain capital letters
    
    -# --> Catppuccin (Mocha)
    -thm_bg="#1e1e2e"
    -thm_fg="#cdd6f4"
    -thm_cyan="#89dceb"
    -thm_black="#181825"
    -thm_gray="#313244"
    -thm_magenta="#cba6f7"
    -thm_pink="#f5c2e7"
    -thm_red="#f38ba8"
    -thm_green="#a6e3a1"
    -thm_yellow="#f9e2af"
    -thm_blue="#89b4fa"
    -thm_orange="#fab387"
    -thm_black4="#585b70"
    +# --> Gruvbox (Mocha)
    +thm_bg="#282828"
    +thm_fg="#ebdbb2"
    +thm_cyan="#83a598"
    +thm_black="#1d2021"
    +thm_gray="#504945"
    +thm_magenta="#d3869b"
    +thm_pink="#d65d0e"
    +thm_red="#fb4934"
    +thm_green="#b8bb26"
    +thm_yellow="#fabd2f"
    +thm_blue="#83a598"
    +thm_orange="#fe8019"
    +thm_black4="#928374"

And just like that we have changed the colors in tmux:  
![img](../IMG/tmux.png)  
But not everything needs to be changed using patch diffs as this is used only for actual source code. You can also overwrite package fields such as version, link to the source etc.  
For example we want to install nerdfonts but we don&rsquo;t want to install whole couple of GB of fonts to just use one font. We can override nerdfonts package:  

    (nerdfonts.override { fonts = [ "Iosevka" "JetBrainsMono" ]; })

In that override we just get two fonts from the whole package.  
Or we want to enable visualiz er in ncmpcpp because by default it&rsquo;s not enabled:  

    pkgs.ncmpcpp.override {
          visualizerSupport = true;
    };

We can also override attributes:  

    mySed = pkgs.gnused.overrideDerivation (oldAttrs: {
      name = "sed-4.2.2-pre";
      src = fetchurl {
        url = "ftp://alpha.gnu.org/gnu/sed/sed-4.2.2-pre.tar.bz2";
        hash = "sha256-MxBJRcM2rYzQYwJ5XKxhXTQByvSg5jZc5cSHEZoB2IY=";
      };
      patches = [];
    });

*Code taken from: [ryantm.github.io/nixpkgs/using/overrides/](https://ryantm.github.io/nixpkgs/using/overrides/)*  
In that code we are changing the name, source url, providing a hash for new url, and changing the patches.  

As you can see changing packages and options looks very straight forward and it&rsquo;s a much cleaner solution than forking or cloning a repo just to change a few things before installation.  
