package io.ionic.starter;

import com.getcapacitor.BridgeActivity;

import com.hemangkumar.capacitorgooglemaps.CapacitorGoogleMaps;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceSate) {
        super.onCreate(savedInstanceSate);
        registerPlugin(CapacitorGoogleMaps.class);
    }
}
