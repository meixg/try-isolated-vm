// builtin modules only
for (const m of Object.keys(__LOADER__.source)) {
    __LOADER__.source[m].compile();
}
