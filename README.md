appium-package-master
===================

A set of tools to create and manage appium packages.

##Create package

```
# using es7/babel
npx gulp package:create -n <package-name>

# regular es5
npx gulp package:create --nobabel -n <package-name>
```

The package will be created in the `out/<package-name>`.
