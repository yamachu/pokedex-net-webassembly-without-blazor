﻿// <auto-generated/>
public partial class MyClass
{
    internal static unsafe void __Wrapper_FetchPokemons_234863345(global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument* __arguments_buffer)
    {
        ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __arg_exception = ref __arguments_buffer[0];
        ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __arg_return = ref __arguments_buffer[1];
        global::System.Threading.Tasks.Task<string> __retVal;
        try
        {
            __retVal = MyClass.FetchPokemons();
            __arg_return.ToJS(__retVal, static (ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __task_result_arg, string __task_result) =>
            {
                __task_result_arg.ToJS(__task_result);
            });
        }
        catch (global::System.Exception ex)
        {
            __arg_exception.ToJS(ex);
        }
    }

    [global::System.Runtime.CompilerServices.ModuleInitializerAttribute]
    [global::System.Diagnostics.CodeAnalysis.DynamicDependencyAttribute("__Wrapper_FetchPokemons_234863345", typeof(MyClass))]
    internal static void __Register_FetchPokemons_234863345()
    {
        if (global::System.Runtime.InteropServices.RuntimeInformation.OSArchitecture != global::System.Runtime.InteropServices.Architecture.Wasm)
            return;
        global::System.Runtime.InteropServices.JavaScript.JSFunctionBinding.BindManagedFunction("[dotnet]MyClass:FetchPokemons", 234863345, new global::System.Runtime.InteropServices.JavaScript.JSMarshalerType[]{global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.Task(global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.String)});
    }
}
public partial class MyClass
{
    internal static unsafe void __Wrapper_FetchPokemonsWithQuery_1185986140(global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument* __arguments_buffer)
    {
        string query;
        ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __arg_exception = ref __arguments_buffer[0];
        ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __arg_return = ref __arguments_buffer[1];
        global::System.Threading.Tasks.Task<string> __retVal;
        // Setup - Perform required setup.
        ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __query_native__js_arg = ref __arguments_buffer[2];
        // Unmarshal - Convert native data to managed data.
        __query_native__js_arg.ToManaged(out query);
        try
        {
            __retVal = MyClass.FetchPokemonsWithQuery(query);
            __arg_return.ToJS(__retVal, static (ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __task_result_arg, string __task_result) =>
            {
                __task_result_arg.ToJS(__task_result);
            });
        }
        catch (global::System.Exception ex)
        {
            __arg_exception.ToJS(ex);
        }
    }

    [global::System.Runtime.CompilerServices.ModuleInitializerAttribute]
    [global::System.Diagnostics.CodeAnalysis.DynamicDependencyAttribute("__Wrapper_FetchPokemonsWithQuery_1185986140", typeof(MyClass))]
    internal static void __Register_FetchPokemonsWithQuery_1185986140()
    {
        if (global::System.Runtime.InteropServices.RuntimeInformation.OSArchitecture != global::System.Runtime.InteropServices.Architecture.Wasm)
            return;
        global::System.Runtime.InteropServices.JavaScript.JSFunctionBinding.BindManagedFunction("[dotnet]MyClass:FetchPokemonsWithQuery", 1185986140, new global::System.Runtime.InteropServices.JavaScript.JSMarshalerType[]{global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.Task(global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.String), global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.String});
    }
}
public partial class MyClass
{
    internal static unsafe void __Wrapper_ConnectionTest_510477109(global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument* __arguments_buffer)
    {
        ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __arg_exception = ref __arguments_buffer[0];
        ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __arg_return = ref __arguments_buffer[1];
        global::System.Threading.Tasks.Task<int> __retVal;
        try
        {
            __retVal = MyClass.ConnectionTest();
            __arg_return.ToJS(__retVal, static (ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __task_result_arg, int __task_result) =>
            {
                __task_result_arg.ToJS(__task_result);
            });
        }
        catch (global::System.Exception ex)
        {
            __arg_exception.ToJS(ex);
        }
    }

    [global::System.Runtime.CompilerServices.ModuleInitializerAttribute]
    [global::System.Diagnostics.CodeAnalysis.DynamicDependencyAttribute("__Wrapper_ConnectionTest_510477109", typeof(MyClass))]
    internal static void __Register_ConnectionTest_510477109()
    {
        if (global::System.Runtime.InteropServices.RuntimeInformation.OSArchitecture != global::System.Runtime.InteropServices.Architecture.Wasm)
            return;
        global::System.Runtime.InteropServices.JavaScript.JSFunctionBinding.BindManagedFunction("[dotnet]MyClass:ConnectionTest", 510477109, new global::System.Runtime.InteropServices.JavaScript.JSMarshalerType[]{global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.Task(global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.Int32)});
    }
}
public partial class MyClass
{
    internal static unsafe void __Wrapper_ExecuteQuery_910372376(global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument* __arguments_buffer)
    {
        string query;
        ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __arg_exception = ref __arguments_buffer[0];
        ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __arg_return = ref __arguments_buffer[1];
        global::System.Threading.Tasks.Task<int> __retVal;
        // Setup - Perform required setup.
        ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __query_native__js_arg = ref __arguments_buffer[2];
        // Unmarshal - Convert native data to managed data.
        __query_native__js_arg.ToManaged(out query);
        try
        {
            __retVal = MyClass.ExecuteQuery(query);
            __arg_return.ToJS(__retVal, static (ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __task_result_arg, int __task_result) =>
            {
                __task_result_arg.ToJS(__task_result);
            });
        }
        catch (global::System.Exception ex)
        {
            __arg_exception.ToJS(ex);
        }
    }

    [global::System.Runtime.CompilerServices.ModuleInitializerAttribute]
    [global::System.Diagnostics.CodeAnalysis.DynamicDependencyAttribute("__Wrapper_ExecuteQuery_910372376", typeof(MyClass))]
    internal static void __Register_ExecuteQuery_910372376()
    {
        if (global::System.Runtime.InteropServices.RuntimeInformation.OSArchitecture != global::System.Runtime.InteropServices.Architecture.Wasm)
            return;
        global::System.Runtime.InteropServices.JavaScript.JSFunctionBinding.BindManagedFunction("[dotnet]MyClass:ExecuteQuery", 910372376, new global::System.Runtime.InteropServices.JavaScript.JSMarshalerType[]{global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.Task(global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.Int32), global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.String});
    }
}
public partial class MyClass
{
    internal static unsafe void __Wrapper_Initialize_2012898934(global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument* __arguments_buffer)
    {
        ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __arg_exception = ref __arguments_buffer[0];
        ref global::System.Runtime.InteropServices.JavaScript.JSMarshalerArgument __arg_return = ref __arguments_buffer[1];
        try
        {
            MyClass.Initialize();
        }
        catch (global::System.Exception ex)
        {
            __arg_exception.ToJS(ex);
        }
    }

    [global::System.Runtime.CompilerServices.ModuleInitializerAttribute]
    [global::System.Diagnostics.CodeAnalysis.DynamicDependencyAttribute("__Wrapper_Initialize_2012898934", typeof(MyClass))]
    internal static void __Register_Initialize_2012898934()
    {
        if (global::System.Runtime.InteropServices.RuntimeInformation.OSArchitecture != global::System.Runtime.InteropServices.Architecture.Wasm)
            return;
        global::System.Runtime.InteropServices.JavaScript.JSFunctionBinding.BindManagedFunction("[dotnet]MyClass:Initialize", 2012898934, new global::System.Runtime.InteropServices.JavaScript.JSMarshalerType[]{global::System.Runtime.InteropServices.JavaScript.JSMarshalerType.Discard});
    }
}
