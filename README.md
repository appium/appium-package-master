appium-package-master
===================

A set of tools to create and manage appium packages.

##Create package

```
# using es7/traceur
gulp create-package -n <package-name>

# regular es5
gulp create-package --notraceur -n <package-name>
```

The package will be created in the `out/<package-name>`.

