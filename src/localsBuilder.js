module.exports = function(patcherPath) {
    let module = {};

    module.setLocals = function(patch, helpers, settings, locals) {
        let effect = xelib.AddElement(patch, 'MGEF\\MGEF');
        let effectEditorID = 'TT_EyeGlitchFix_Effect';
        helpers.cacheRecord(effect, effectEditorID);
        xelib.AddElementValue(effect, 'EDID', effectEditorID);
        xelib.AddElementValue(effect, 'FULL', 'Eye Glitch Fix Effect');
        xelib.AddElement(effect, 'Magic Effect Data');
        xelib.SetFlag(effect, 'Magic Effect Data\\DATA\\Flags', 'No Duration', true);
        xelib.SetFlag(effect, 'Magic Effect Data\\DATA\\Flags', 'No Magnitude', true);
        xelib.SetFlag(effect, 'Magic Effect Data\\DATA\\Flags', 'No Area', true);
        xelib.SetFlag(effect, 'Magic Effect Data\\DATA\\Flags', 'Hide in UI', true);
        xelib.SetValue(effect, 'Magic Effect Data\\DATA\\Magic Skill', 'None');
        xelib.SetValue(effect, 'Magic Effect Data\\DATA\\Resist Value', 'None');
        xelib.SetValue(effect, 'Magic Effect Data\\DATA\\Archtype', 'Script');
        xelib.SetValue(effect, 'Magic Effect Data\\DATA\\Casting Type', 'Constant Effect');
        xelib.SetValue(effect, 'Magic Effect Data\\DATA\\Delivery', 'Self');
        xelib.SetValue(effect, 'Magic Effect Data\\DATA\\Actor Value', 'None');
        xelib.SetValue(effect, 'Magic Effect Data\\DATA\\Second Actor Value', 'None');
        xelib.SetValue(effect, 'Magic Effect Data\\DATA\\Casting Sound Level', 'Silent');
        // Replace with AddScript() once fixed
        xelib.AddElement(effect, 'VMAD\\Scripts');
        xelib.SetIntValue(effect, 'VMAD\\Version', 5);
        xelib.SetIntValue(effect, 'VMAD\\Object Format', 2);
        let effectScript = xelib.AddArrayItem(effect, 'VMAD\\Scripts', 'scriptName', 'TT_InvisibilityEyeGlitchFix');
        let effectProperty = xelib.AddScriptProperty(effectScript, 'EyeGlitchFix', 'Object', 'Edited');
        helpers.logMessage(xelib.LongPath(effectScript));

        locals.spell = xelib.AddElement(patch, 'SPEL\\SPEL');
        let spellEditorID = 'TT_EyeGlitchFix_Spell';
        helpers.cacheRecord(locals.spell, spellEditorID);
        xelib.AddElementValue(locals.spell, 'EDID', effectEditorID);
        xelib.AddElementValue(locals.spell, 'FULL', 'Eye Glitch Fix');
        xelib.AddElementValue(locals.spell, 'ETYP', 'EitherHand [EQUP:00013F44]');
        xelib.AddElement(locals.spell, 'SPIT');
        xelib.SetValue(locals.spell, 'SPIT\\Type', 'Ability');
        xelib.SetValue(locals.spell, 'SPIT\\Cast Type', 'Constant Effect');
        xelib.SetValue(locals.spell, 'SPIT\\Target Type', 'Self');
        // Spells seem to be created with a NULL effect
        if (xelib.HasElement(locals.spell, 'Effects')) {
            xelib.RemoveElement(locals.spell, 'Effects');
        }
        let spellEffect = xelib.AddEffect(locals.spell, xelib.GetHexFormID(effect, false, false), '0', '0', '0');
        // xelib.AddCondition(spellEffect, 'IsRidingMount', '10000000', '0.000000', '00 00 00 00');
        
        xelib.SetValue(effectProperty, 'Value\\Object Union\\Object v2\\FormID', xelib.GetHexFormID(locals.spell, false, false));
        xelib.SetValue(effectProperty, 'Value\\Object Union\\Object v2\\Alias', 'None');
    }

    return module;
}
