import icons from "@/lib/icons";
import { type_matches, type_synonyms } from "@/lib/type-matches/index";

function get_icon(val) {
    let mimeObj =
        typeof val == 'object' ? val : { extensions: { current: val } };

    // try to get icon given extension
    let icon = icons[mimeObj.extensions.current];

    if (!icon) {
        icon = icons[mimeObj.subType];
    }

    // if failed, try the broader type or return default file
    if (!icon) {
        let types = type_matches(mimeObj.extensions.current);
        types = type_synonyms(types, mimeObj.extensions.current);
        for (let t of types) {
            icon = icons[t];
            if (icon) break;
        }
        icon = icon || icons['default_file'];
    }

    // console.log(mimeObj, icon);
    return icon;
}

export default get_icon;