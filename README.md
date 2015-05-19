appium-package-master
===================

A set of tools to create and manage appium packages.

##Create package

```
# using es7/babel
gulp create-package -n <package-name>

# regular es5
gulp create-package --nobabel -n <package-name>
```

The package will be created in the `out/<package-name>`.

