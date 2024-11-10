import {ChemicalBuild} from "chemicaljs";
const build = new ChemicalBuild({
    path: "dist",
    default: "uv",
    uv: true,
    experimental: { meteor: true, scramjet: true },
    scramjet: true,
    meteor: true,
    rammerhead: true,
});
build.write();