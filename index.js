registerPatcher({
	info: info,
	gameModes: [xelib.gmTES5, xelib.gmSSE],
	settings: {
		label: 'Invisibility Eye Glitch Fix',
		hidden: true,
		templateUrl: `${patcherUrl}/partials/settings.html`,
		defaultSettings: {}
	},
	requiredFiles: [],
	getFilesToPatch: function(filenames) {
		return filenames;
	},
	execute: {
		initialize: function(patch, helpers, settings, locals) {
			localsBuilder.setLocals(patch, helpers, settings, locals);
		},
		process: [{
			load: function(plugin, helpers, settings, locals) {
				return {
					signature: 'MGEF',
					filter: function(record) {
						let archtype = xelib.GetValue(record, 'Magic Effect Data\\DATA\\Archtype');
						return (archtype === 'Invisibility');
					}
				}
			},
			patch: function(record, helpers, settings, locals) {
				// Replace with AddScript() once fixed
				if (!xelib.HasElement(record, 'VMAD\\Scripts')) {
					xelib.AddElement(record, 'VMAD\\Scripts');
					xelib.SetIntValue(record, 'VMAD\\Version', 5);
					xelib.SetIntValue(record, 'VMAD\\Object Format', 2);
				}
				let script = xelib.AddArrayItem(record, 'VMAD\\Scripts', 'scriptName', 'TT_InvisibilityEyeGlitchActivator');
				let property = xelib.AddScriptProperty(script, 'EyeGlitchFix', 'Object', 'Edited');
				xelib.SetValue(property, 'Value\\Object Union\\Object v2\\FormID', xelib.GetHexFormID(locals.spell, false, false));
				xelib.SetValue(property, 'Value\\Object Union\\Object v2\\Alias', 'None');
			}
		}]
	}
});
