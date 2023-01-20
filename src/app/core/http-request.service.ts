import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as lodash from "lodash";
import { of } from "rxjs";

import { SharedDataService } from "./shared-data.service";
@Injectable({
  providedIn: "root",
})
export class HttpRequestService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  apiBasePath = "http://localhost:3001/";
  //apiBasePath = 'https://skumar-mca-node-api-2.glitch.me/';

  constructor(
    private http: HttpClient,
    private sharedDataService: SharedDataService
  ) {}

  cacheData = [
    {
      url: "todos",
      data: {
        success: true,
        data: [
          {
            _id: "63ca5cd699eb680870a9fe8f",
            title: "Learn Next.Js",
            status: "OPEN",
            projectId: "self-learning",
            userId: "637928e561df7932741f8a8c",
            createdDate: "2023-01-20T09:20:22.600Z",
            __v: 0,
          },
          {
            _id: "63ca5cf899eb680870a9fe90",
            title: "Learn LIT Web Components",
            status: "OPEN",
            projectId: "self-learning",
            userId: "637928e561df7932741f8a8c",
            createdDate: "2023-01-20T09:20:56.682Z",
            __v: 0,
          },
          {
            _id: "63ca5d1499eb680870a9fe91",
            title: "Learn GraphQL",
            status: "OPEN",
            projectId: "self-learning",
            userId: "637928e561df7932741f8a8c",
            createdDate: "2023-01-20T09:21:24.745Z",
            __v: 0,
          },
        ],
        message: "",
        error: null,
      },
    },
    {
      url: "todos?all=yes",
      data: {
        success: true,
        data: [
          {
            _id: "63ca5cd699eb680870a9fe8f",
            title: "Learn Next.Js",
            status: "OPEN",
            projectId: "self-learning",
            userId: "637928e561df7932741f8a8c",
            createdDate: "2023-01-20T09:20:22.600Z",
            __v: 0,
          },
          {
            _id: "63ca5cf899eb680870a9fe90",
            title: "Learn LIT Web Components",
            status: "OPEN",
            projectId: "self-learning",
            userId: "637928e561df7932741f8a8c",
            createdDate: "2023-01-20T09:20:56.682Z",
            __v: 0,
          },
          {
            _id: "63ca5d1499eb680870a9fe91",
            title: "Learn GraphQL",
            status: "OPEN",
            projectId: "self-learning",
            userId: "637928e561df7932741f8a8c",
            createdDate: "2023-01-20T09:21:24.745Z",
            __v: 0,
          },
          {
            _id: "63ca5d8599eb680870a9fe92",
            title: "Add React Content",
            status: "CLOSE",
            projectId: "ui-geeks",
            userId: "637928e561df7932741f8a8c",
            createdDate: "2023-01-20T09:23:17.124Z",
            __v: 0,
            closeDate: "2023-01-20T09:23:19.907Z",
          },
        ],
        message: "",
        error: null,
      },
    },
    {
      url: "allocations?filter=true",
      data: {
        success: true,
        data: [
          {
            _id: "637929cd61df7932741f8a90",
            percentage: 30,
            projectId: "ui-geeks",
            startDate: "2022-10-31T18:30:00.000Z",
            endDate: "2025-11-30T18:30:00.000Z",
            notes: "",
            isActive: true,
            userId: "637928e561df7932741f8a8c",
            __v: 0,
          },
          {
            _id: "63ca4f6299eb680870a9fe78",
            percentage: 20,
            projectId: "utilities",
            startDate: "2022-05-31T18:30:00.000Z",
            endDate: "2024-12-31T18:30:00.000Z",
            notes: "",
            isActive: true,
            userId: "637928e561df7932741f8a8c",
            __v: 0,
          },
          {
            _id: "63ca4f7599eb680870a9fe79",
            percentage: 50,
            projectId: "self-learning",
            startDate: "2022-05-31T18:30:00.000Z",
            endDate: "2024-12-31T18:30:00.000Z",
            notes: "",
            isActive: true,
            userId: "637928e561df7932741f8a8c",
            __v: 0,
          },
        ],
        message: "",
        error: null,
      },
    },
    {
      url: "links",
      data: {
        success: true,
        data: [
          {
            _id: "63ca516899eb680870a9fe89",
            projectId: "self-learning",
            title: "Bootstrap Icons",
            url: "https://icons.getbootstrap.com/",
            userId: "637928e561df7932741f8a8c",
            timeStamp: "2023-01-20T08:31:36.917Z",
            __v: 0,
          },
          {
            _id: "63ca51bd99eb680870a9fe8b",
            projectId: "self-learning",
            title: "JS Notes | Stanford",
            url: "https://web.stanford.edu/class/cs98si/",
            userId: "637928e561df7932741f8a8c",
            timeStamp: "2023-01-20T08:33:01.520Z",
            __v: 0,
          },
          {
            _id: "63ca51a299eb680870a9fe8a",
            projectId: "self-learning",
            title: "Learn CSS",
            url: "https://web.dev/learn/css/",
            userId: "637928e561df7932741f8a8c",
            timeStamp: "2023-01-20T08:32:34.161Z",
            __v: 0,
          },
          {
            _id: "63ca511e99eb680870a9fe86",
            projectId: "utilities",
            title: "Profile",
            url: "https://skumar-mca.github.io/profile/",
            userId: "637928e561df7932741f8a8c",
            timeStamp: "2023-01-20T08:30:22.504Z",
            __v: 0,
          },
          {
            _id: "63ca515399eb680870a9fe88",
            projectId: "self-learning",
            title: "Resize Image | Tool",
            url: "https://www.reduceimages.com/",
            userId: "637928e561df7932741f8a8c",
            timeStamp: "2023-01-20T08:31:15.810Z",
            __v: 0,
          },
          {
            _id: "63ca506b99eb680870a9fe83",
            projectId: "ui-geeks",
            title: "UI Geeks Portal",
            url: "https://www.ui-geeks.in",
            userId: "637928e561df7932741f8a8c",
            timeStamp: "2023-01-20T08:27:23.535Z",
            __v: 0,
          },
          {
            _id: "63ca509899eb680870a9fe84",
            projectId: "ui-geeks",
            title: "UI Geeks | Instagram Page",
            url: "https://www.instagram.com/ui_geeks_in",
            userId: "637928e561df7932741f8a8c",
            timeStamp: "2023-01-20T08:28:08.385Z",
            __v: 0,
          },
          {
            _id: "63ca50e399eb680870a9fe85",
            projectId: "ui-geeks",
            title: "UI Geeks | LinkedIn",
            url: "https://www.linkedin.com/in/ui-geeks-india-1bb823254/",
            userId: "637928e561df7932741f8a8c",
            timeStamp: "2023-01-20T08:29:23.718Z",
            __v: 0,
          },
          {
            _id: "63ca513099eb680870a9fe87",
            projectId: "utilities",
            title: "Utilities Portal",
            url: "https://skumar-mca.github.io/utilities/#/",
            userId: "637928e561df7932741f8a8c",
            timeStamp: "2023-01-20T08:30:40.505Z",
            __v: 0,
          },
        ],
        message: "",
        error: null,
      },
    },
    {
      url: "knowledge-base?category=2",
      data: {
        success: true,
        data: [
          {
            _id: "63ca53dc99eb680870a9fe8c",
            title: "JavaScript Introduction",
            technologyId: null,
            category: 2,
            createDate: "2023-01-20T08:42:04.036Z",
          },
          {
            _id: "63ca550699eb680870a9fe8d",
            title: "JavaScript Lexical Scope",
            technologyId: null,
            category: 2,
            createDate: "2023-01-20T08:47:02.167Z",
          },
          {
            _id: "63ca561a99eb680870a9fe8e",
            title: "React Hooks",
            technologyId: null,
            category: 2,
            createDate: "2023-01-20T08:51:38.536Z",
          },
        ],
        message: "",
        error: null,
      },
    },
    {
      url: "knowledge-base/63ca53dc99eb680870a9fe8c?category=undefined",
      data: {
        success: true,
        data: {
          _id: "63ca53dc99eb680870a9fe8c",
          title: "JavaScript Introduction",
          technologyId: null,
          content:
            '<div><b>Introduction</b></div><div><b><br></b></div><div>JavaScript (JS) is a light-weight, interpreted or just-in-time compiled programming language with first-class functions. It is prototype-based, multi-paradigm, single threaded, dynamic language, supporting object-oriented, imperative and declarative styles.</div><div><br></div><div>Let\'s learn about all the buzz-words given in JavaScript definition.</div><div><br></div><div><b>Interpreted or Just-in-time Compiled</b></div><div>There has always been a confusion related to the execution behavior of JavaScript. The debate is between Interpreted and Compiled. To know the answer, let\'s understand both terminologies.</div><div><br></div><div><b>Interpreted Language</b>: In an interpreted language, the code is run from top to bottom and the result of running the code is immediately returned. The interpreter reads and executes one line at a time. The interpreter stops the execution on error, which means, if interpreter fails on a statement at line number 10, further lines of code are not executed.</div><div><br></div><div>In the context of the browser, we don\'t have to transform the code into any other form before the browser runs it. The code is received in its plain-text format and processed directly from that.</div><div><br></div><div><b>Compiled Language</b>: Compiled language scans the entire code and transforms (compiles) it into another form, before they are executed by the computer. The program is executed from a binary format, which was generated from the original source code (in plain-text format).</div><div><br></div><div><b>Just-in-time Compilation</b>: Modern JavaScript interpreters use a technique called just-in-time compilation to improve performance. In this technique, JavaScript source code gets compiled into binary format, so that it can run quickly.</div><div><br></div><div>Now returning back to the original question, whether JavaScript is interpreted or compiled language?</div><div><br></div><div>The answer is, JavaScript is an interpreted language, because although modern interpreters use JIT, still all this compilation is handled at run time, rather than ahead of time.</div><div><br></div><div><b>First Class Functions</b></div><div>A programming language is said to have first-class functions, when functions are treated as other data types. For example: they can be stored in a variable, they can be passed as an argument to another function, can be extended, etc. JavaScript treats functions as first class citizens.</div><div><br></div><div><b>Prototype-based</b></div><div>Prototype based programming is a style of object oriented programming in which classes are not explicitly defined, rather derived by adding properties and methods to an empty object. In simple words, this type of style treats an object as the prototype or the template for the creation of another object.</div><div><br></div><div><b>Multi-paradigm</b></div><div>JavaScript supports multiple programming paradigms like imperative, declarative, object-oriented, functional programming, therefore, JavaScript is said to be a multi-paradigm language.</div><div><br></div><div><b>Single Threaded</b></div><div>JavaScript has a single thread, which is used to execute the code. Because of this single thread, JavaScript is synchronous in nature. Although modern browsers has concepts like Call Stack, Memory Heap, Event-loop, which helps it perform asynchronous tasks.</div><div><br></div><div><b>Dynamic Language</b></div><div>Dynamic language is one, in which operations which are normally done at compile time, can be done at run time. Operations like Adding properties/methods to an object, changing class/object prototype. Because JavaScript allows such operations, therefore, it is known as Dynamic Language.</div><div><br></div><div><b>Object-oriented</b></div><div>Object-oriented programming paradigm consists of classes/objects holding the data and respective methods that can be taken on the data. Because JavaScript has the concept of class/objects and implements inheritance and various other concepts of object-oriented language, therefore it is known to support object-oriented programming style.</div><div><br></div><div><b>Imperative</b></div><div>Imperative Programming language is a language where instructions for computers are written in step-by-step manner. This explicitly describes the order of execution to achieve the end result. Imperative language describes "How" of the desired output.</div><div>Because JavaScript statements can be written to describe the steps to get the desired result, therefore, it is known to be imperative in nature. For example, a for-loop can be written to iterate and print each item of an array.</div><div><br></div><div><b>Declarative</b></div><div>Declarative programming language is one, in which programs describe their desired results without explicitly listing steps that must be performed. The codes of such languages are very abstract in nature. Functional and Logical programming languages are examples of declarative programming style. Declarative languages describe "WHAT" of the desired output.&nbsp;<span style="background-color: transparent; font-size: 1rem;">Because JavaScript implements functional programming style, therefore, it is known to be declarative in nature. For example, the sort() method of Array can be called to sort all the items of the array, we do not need to write down the steps to sort the array.</span></div>',
          category: 2,
          userId: "637928e561df7932741f8a8c",
          createDate: "2023-01-20T08:42:04.036Z",
          __v: 0,
        },
        message: "",
        error: null,
      },
    },
    {
      url: "knowledge-base/63ca550699eb680870a9fe8d?category=undefined",
      data: {
        success: true,
        data: {
          _id: "63ca550699eb680870a9fe8d",
          title: "JavaScript Lexical Scope",
          technologyId: null,
          content:
            '<div><b>Lexical Scope</b></div><div><b><br></b></div><div>The word <b><i>"lexical"</i></b> refers to the fact that lexical scoping uses the location where a variable is declared within the source code, to determine where that variable can be accessible.</div><div><br></div><div>There are three types of scope in JavaScript:</div><div><ol><li><b>Global Scope</b><br>Variables defined in global scope are available throughout the source code.</li><li><b>Function Scope</b><br>Variables defined in function scope are available in that function body only i.e they are local to that function.</li><li><b>Lexical Scope</b><br>This is also known as block-scope and was introduced in ES6. Variables defined in lexical scope are available only within the enclosing block.</li></ol></div><div>In ES6, JavaScript introduced the let and const keywords, which allows to create block-scoped variables.</div><div><br></div><div>if(true) { const x = 1; }</div><div>else { const x = 2; }</div><div>console.log(x);<span style="white-space:pre">\t</span><b><i>// ReferenceError</i></b></div><div><br></div><div>The above statement gives <b><i>ReferenceError</i></b>, because <b>"x"</b> is a <i>block-scoped</i> variable and is not accessible here.</div><div><br></div><div>In contrast to the above example, if we declare a variable using <b>var</b>, it would create a <i>global scope</i> and the variable should be available after the&nbsp;</div><div><i>if-else</i> block.</div><div>if(true) { var x = 1; }</div><div>else { var x = 2; }</div><div>console.log(x);<span style="white-space:pre">\t</span>// 1</div><div>Since we know about lexical scope, now let\'s try to understand closures.</div><div><br></div><div><i>In closure</i>, the <i>lexical environment</i> consists of any local variables that were in-scope at the time of closure creation. Let\'s try to understand this with the help of an example.</div><div>function makeAdder(x) {</div><div>&nbsp; return function(y) { return x + y; }</div><div>}</div><div><br></div><div><u>Lexical environment contains</u>: variable x</div><div>const add5 = makeAdder(5);</div><div>Because the makerAdder() function is returned, "x" should have been gone, but since it formed closure, "x" is still available in lexical scope.</div><div><br></div><div>The value of the <i>lexical environment</i> variable x would be <b>5</b>.</div><div>const add10 = makeAdder(10);</div><div>The value of the <i>lexical environment</i> variable x would be <b>10</b>.</div><div>console.log(add5(2))<span style="white-space:pre">\t</span>// 7</div><div>console.log(add10(2))<span style="white-space:pre">\t</span>// 12</div><div><br></div><div>Both add5() and add10() are closures. They share the same function body definition, but store different <i>lexical environments</i>. In add5(), lexical environment x is 5, while in add10() it is 10.</div>',
          category: 2,
          userId: "637928e561df7932741f8a8c",
          createDate: "2023-01-20T08:47:02.167Z",
          __v: 0,
        },
        message: "",
        error: null,
      },
    },
    {
      url: "knowledge-base/63ca561a99eb680870a9fe8e?category=undefined",
      data: {
        success: true,
        data: {
          _id: "63ca561a99eb680870a9fe8e",
          title: "React Hooks",
          technologyId: null,
          content:
            "<div><b>Hooks</b></div><div>Hooks were added in React <b>v16.8</b>. Hooks lets us use <i>state</i> and other React features without writing a <i>class component</i>. Hooks are functions that let us <b>\"hook into\"</b> React state and lifecycle features from function components. Hooks don't work inside class components.</div><div>React provides a few built-in Hooks like useState(), useEffect(), etc. We can also create custom hooks to reuse stateful behavior between different components.</div><div><br></div><div><b>Rules of Hooks</b></div><div>Hooks are JavaScript functions, but they impose two additional rules:</div><div><ul><li>Only call Hooks at the top level. Don't call Hooks inside loops, conditions or nested functions.</li><li>Only call Hooks from React function components. Don't call Hooks from regular JavaScript functions.</li></ul><div><br></div></div><div><b>Basic Hooks:</b></div><div><ul><li>useState()</li><li>useEffect()</li><li>useContect()</li><li>useReducer()</li><li>useCallback()</li><li>useMemo()</li><li>useRef()</li><li>useImperativeHandle()</li><li>useLayoutEffect()</li></ul></div>",
          category: 2,
          userId: "637928e561df7932741f8a8c",
          createDate: "2023-01-20T08:51:38.536Z",
          __v: 0,
        },
        message: "",
        error: null,
      },
    },
  ];

  searchTerm = (term: string, data: Array<any>) => {
    term = (term || "").toLocaleLowerCase();
    return data
      .filter((itm: any) => {
        return (
          (itm.data.title || "").toLocaleLowerCase().indexOf(term) > -1 ||
          (itm.data.content || "").toLocaleLowerCase().indexOf(term) > -1
        );
      })
      .map((itm: any) => itm.data);
  };

  get(url) {
    let httpOptions = this.httpOptions;
    let projectId = lodash.get(
      this.sharedDataService,
      "selectedProject.projectAlias",
      null
    );

    if (projectId) {
      httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          projectId: projectId,
        }),
      };
    }

    const data = this.cacheData.find((itm: any) => itm.url === url);
    if (data) {
      return of(data.data);
    }

    if (url.indexOf("search?term=") > -1) {
      const term = url.split("term=")[1];
      const resp = {
        success: true,
        data: [
          {
            type: "Links",
            data: this.searchTerm(
              term,
              this.cacheData
                .filter((itm: any) => itm.url.indexOf("links") > -1)
                .map((itm) => itm.data)
            ),
          },
          { type: "quickNotes", data: [] },
          {
            type: "learnings",
            data: this.searchTerm(
              term,
              this.cacheData
                .filter((itm: any) => itm.url.indexOf("knowledge-base/") > -1)
                .map((itm) => itm.data)
            ),
          },
        ],
        message: "",
        error: null,
      };

      return of(resp);
    }

    return this.http.get(this.apiBasePath + url, httpOptions);
  }

  post(url, postData) {
    return this.http.post(this.apiBasePath + url, postData, this.httpOptions);
  }

  put(url, postData) {
    return this.http.put(this.apiBasePath + url, postData, this.httpOptions);
  }

  delete(url) {
    return this.http.delete(this.apiBasePath + url, this.httpOptions);
  }

  pathch(url, postData) {
    return this.http.patch(url, postData, this.httpOptions);
  }
}
