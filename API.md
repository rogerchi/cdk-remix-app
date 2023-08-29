# replace this
# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### RemixApp <a name="RemixApp" id="@rogerchi/cdk-remix-app.RemixApp"></a>

#### Initializers <a name="Initializers" id="@rogerchi/cdk-remix-app.RemixApp.Initializer"></a>

```typescript
import { RemixApp } from '@rogerchi/cdk-remix-app'

new RemixApp(scope: Construct, id: string, __2: RemixAppProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rogerchi/cdk-remix-app.RemixApp.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@rogerchi/cdk-remix-app.RemixApp.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rogerchi/cdk-remix-app.RemixApp.Initializer.parameter.__2">__2</a></code> | <code><a href="#@rogerchi/cdk-remix-app.RemixAppProps">RemixAppProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@rogerchi/cdk-remix-app.RemixApp.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@rogerchi/cdk-remix-app.RemixApp.Initializer.parameter.id"></a>

- *Type:* string

---

##### `__2`<sup>Required</sup> <a name="__2" id="@rogerchi/cdk-remix-app.RemixApp.Initializer.parameter.__2"></a>

- *Type:* <a href="#@rogerchi/cdk-remix-app.RemixAppProps">RemixAppProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@rogerchi/cdk-remix-app.RemixApp.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@rogerchi/cdk-remix-app.RemixApp.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@rogerchi/cdk-remix-app.RemixApp.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@rogerchi/cdk-remix-app.RemixApp.isConstruct"></a>

```typescript
import { RemixApp } from '@rogerchi/cdk-remix-app'

RemixApp.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@rogerchi/cdk-remix-app.RemixApp.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rogerchi/cdk-remix-app.RemixApp.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@rogerchi/cdk-remix-app.RemixApp.property.cdnDistributionId">cdnDistributionId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rogerchi/cdk-remix-app.RemixApp.property.cdnDomainName">cdnDomainName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rogerchi/cdk-remix-app.RemixApp.property.handler">handler</a></code> | <code>aws-cdk-lib.aws_lambda.Function</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@rogerchi/cdk-remix-app.RemixApp.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cdnDistributionId`<sup>Required</sup> <a name="cdnDistributionId" id="@rogerchi/cdk-remix-app.RemixApp.property.cdnDistributionId"></a>

```typescript
public readonly cdnDistributionId: string;
```

- *Type:* string

---

##### `cdnDomainName`<sup>Required</sup> <a name="cdnDomainName" id="@rogerchi/cdk-remix-app.RemixApp.property.cdnDomainName"></a>

```typescript
public readonly cdnDomainName: string;
```

- *Type:* string

---

##### `handler`<sup>Required</sup> <a name="handler" id="@rogerchi/cdk-remix-app.RemixApp.property.handler"></a>

```typescript
public readonly handler: Function;
```

- *Type:* aws-cdk-lib.aws_lambda.Function

---


## Structs <a name="Structs" id="Structs"></a>

### RemixAppProps <a name="RemixAppProps" id="@rogerchi/cdk-remix-app.RemixAppProps"></a>

#### Initializer <a name="Initializer" id="@rogerchi/cdk-remix-app.RemixAppProps.Initializer"></a>

```typescript
import { RemixAppProps } from '@rogerchi/cdk-remix-app'

const remixAppProps: RemixAppProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rogerchi/cdk-remix-app.RemixAppProps.property.remixPath">remixPath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rogerchi/cdk-remix-app.RemixAppProps.property.cognitoAuth">cognitoAuth</a></code> | <code><a href="#@rogerchi/cdk-remix-app.RemixCognitoAuthProps">RemixCognitoAuthProps</a></code> | *No description.* |
| <code><a href="#@rogerchi/cdk-remix-app.RemixAppProps.property.customDomain">customDomain</a></code> | <code><a href="#@rogerchi/cdk-remix-app.RemixCustomDomainProps">RemixCustomDomainProps</a></code> | *No description.* |
| <code><a href="#@rogerchi/cdk-remix-app.RemixAppProps.property.ddbSessions">ddbSessions</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@rogerchi/cdk-remix-app.RemixAppProps.property.isDev">isDev</a></code> | <code>boolean</code> | *No description.* |

---

##### `remixPath`<sup>Required</sup> <a name="remixPath" id="@rogerchi/cdk-remix-app.RemixAppProps.property.remixPath"></a>

```typescript
public readonly remixPath: string;
```

- *Type:* string

---

##### `cognitoAuth`<sup>Optional</sup> <a name="cognitoAuth" id="@rogerchi/cdk-remix-app.RemixAppProps.property.cognitoAuth"></a>

```typescript
public readonly cognitoAuth: RemixCognitoAuthProps;
```

- *Type:* <a href="#@rogerchi/cdk-remix-app.RemixCognitoAuthProps">RemixCognitoAuthProps</a>

---

##### `customDomain`<sup>Optional</sup> <a name="customDomain" id="@rogerchi/cdk-remix-app.RemixAppProps.property.customDomain"></a>

```typescript
public readonly customDomain: RemixCustomDomainProps;
```

- *Type:* <a href="#@rogerchi/cdk-remix-app.RemixCustomDomainProps">RemixCustomDomainProps</a>

---

##### `ddbSessions`<sup>Optional</sup> <a name="ddbSessions" id="@rogerchi/cdk-remix-app.RemixAppProps.property.ddbSessions"></a>

```typescript
public readonly ddbSessions: boolean;
```

- *Type:* boolean

---

##### `isDev`<sup>Optional</sup> <a name="isDev" id="@rogerchi/cdk-remix-app.RemixAppProps.property.isDev"></a>

```typescript
public readonly isDev: boolean;
```

- *Type:* boolean

---

### RemixCognitoAuthProps <a name="RemixCognitoAuthProps" id="@rogerchi/cdk-remix-app.RemixCognitoAuthProps"></a>

#### Initializer <a name="Initializer" id="@rogerchi/cdk-remix-app.RemixCognitoAuthProps.Initializer"></a>

```typescript
import { RemixCognitoAuthProps } from '@rogerchi/cdk-remix-app'

const remixCognitoAuthProps: RemixCognitoAuthProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rogerchi/cdk-remix-app.RemixCognitoAuthProps.property.authDomain">authDomain</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@rogerchi/cdk-remix-app.RemixCognitoAuthProps.property.userPool">userPool</a></code> | <code>aws-cdk-lib.aws_cognito.IUserPool</code> | *No description.* |

---

##### `authDomain`<sup>Required</sup> <a name="authDomain" id="@rogerchi/cdk-remix-app.RemixCognitoAuthProps.property.authDomain"></a>

```typescript
public readonly authDomain: string;
```

- *Type:* string

---

##### `userPool`<sup>Required</sup> <a name="userPool" id="@rogerchi/cdk-remix-app.RemixCognitoAuthProps.property.userPool"></a>

```typescript
public readonly userPool: IUserPool;
```

- *Type:* aws-cdk-lib.aws_cognito.IUserPool

---

### RemixCustomDomainProps <a name="RemixCustomDomainProps" id="@rogerchi/cdk-remix-app.RemixCustomDomainProps"></a>

#### Initializer <a name="Initializer" id="@rogerchi/cdk-remix-app.RemixCustomDomainProps.Initializer"></a>

```typescript
import { RemixCustomDomainProps } from '@rogerchi/cdk-remix-app'

const remixCustomDomainProps: RemixCustomDomainProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@rogerchi/cdk-remix-app.RemixCustomDomainProps.property.certificate">certificate</a></code> | <code>aws-cdk-lib.aws_certificatemanager.ICertificate</code> | *No description.* |
| <code><a href="#@rogerchi/cdk-remix-app.RemixCustomDomainProps.property.domainName">domainName</a></code> | <code>string</code> | *No description.* |

---

##### `certificate`<sup>Required</sup> <a name="certificate" id="@rogerchi/cdk-remix-app.RemixCustomDomainProps.property.certificate"></a>

```typescript
public readonly certificate: ICertificate;
```

- *Type:* aws-cdk-lib.aws_certificatemanager.ICertificate

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="@rogerchi/cdk-remix-app.RemixCustomDomainProps.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

---



