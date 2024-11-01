import {ChemicalBuild} from "chemicaljs";
const build = new ChemicalBuild({
    path: "dist",
    default: "uv",
    uv: true,
    scramjet: true,
    meteor: true,
    rammerhead: false,
});
build.write();