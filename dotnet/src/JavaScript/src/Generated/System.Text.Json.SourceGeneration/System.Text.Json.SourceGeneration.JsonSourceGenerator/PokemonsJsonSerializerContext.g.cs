﻿// <auto-generated/>

#nullable enable annotations
#nullable disable warnings

// Suppress warnings about [Obsolete] member usage in generated code.
#pragma warning disable CS0618

    public partial class MyClass
    {

        
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Text.Json.SourceGeneration", "7.0.7.1805")]
        internal partial class PokemonsJsonSerializerContext
        {
            
            private static global::System.Text.Json.JsonSerializerOptions s_defaultOptions { get; } = new global::System.Text.Json.JsonSerializerOptions()
            {
                DefaultIgnoreCondition = global::System.Text.Json.Serialization.JsonIgnoreCondition.Never,
                IgnoreReadOnlyFields = false,
                IgnoreReadOnlyProperties = false,
                IncludeFields = false,
                WriteIndented = false,
                        PropertyNamingPolicy = global::System.Text.Json.JsonNamingPolicy.CamelCase
            };
            
            private static global::MyClass.PokemonsJsonSerializerContext? s_defaultContext;
            
            /// <summary>
            /// The default <see cref="global::System.Text.Json.Serialization.JsonSerializerContext"/> associated with a default <see cref="global::System.Text.Json.JsonSerializerOptions"/> instance.
            /// </summary>
            public static global::MyClass.PokemonsJsonSerializerContext Default => s_defaultContext ??= new global::MyClass.PokemonsJsonSerializerContext(new global::System.Text.Json.JsonSerializerOptions(s_defaultOptions));
            
            /// <summary>
            /// The source-generated options associated with this context.
            /// </summary>
            protected override global::System.Text.Json.JsonSerializerOptions? GeneratedSerializerOptions { get; } = s_defaultOptions;
            
            /// <inheritdoc/>
            public PokemonsJsonSerializerContext() : base(null)
            {
            }
            
            /// <inheritdoc/>
            public PokemonsJsonSerializerContext(global::System.Text.Json.JsonSerializerOptions options) : base(options)
            {
            }
            
            private static global::System.Text.Json.Serialization.JsonConverter? GetRuntimeProvidedCustomConverter(global::System.Text.Json.JsonSerializerOptions options, global::System.Type type)
            {
                global::System.Collections.Generic.IList<global::System.Text.Json.Serialization.JsonConverter> converters = options.Converters;
            
                for (int i = 0; i < converters.Count; i++)
                {
                    global::System.Text.Json.Serialization.JsonConverter? converter = converters[i];
            
                    if (converter.CanConvert(type))
                    {
                        if (converter is global::System.Text.Json.Serialization.JsonConverterFactory factory)
                        {
                            converter = factory.CreateConverter(type, options);
                            if (converter == null || converter is global::System.Text.Json.Serialization.JsonConverterFactory)
                            {
                                throw new global::System.InvalidOperationException(string.Format("The converter '{0}' cannot return null or a JsonConverterFactory instance.", factory.GetType()));
                            }
                        }
            
                        return converter;
                    }
                }
            
                return null;
            }
        }
}
