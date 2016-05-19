package de.developgroup.mrf.server;

import com.google.inject.Singleton;
import org.eclipse.jetty.websocket.api.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Singleton
public class ClientManager {
    private static final Logger LOGGER = LoggerFactory.getLogger(ClientManager.class);

    private static final Map<Integer, Session > sessions = Collections.synchronizedMap( new HashMap<Integer, Session>() );
    private AtomicInteger lastClientId = new AtomicInteger(1000);

    public void addClient(final Session session){
        int clientId = generateClientId();
        sessions.put(clientId, session );
        try {
            session.getRemote().sendString("{\"jsonrpc\": \"2.0\", \"method\": \"setClientId\", \"params\": ["+clientId+"]}");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void removeClosedSessions(){
        Iterator<Session> iter = sessions.values().iterator();
        while (iter.hasNext()) {
            Session session = iter.next();
            if(!session.isOpen()){
                LOGGER.info("Remove session: "+session.getRemoteAddress().toString());
                iter.remove();
            }
        }

    }

    public int getConnectedClientsCount(){
        return sessions.size();
    }

    public boolean isNoClientConnected(){
        return sessions.isEmpty();
    }

    public boolean isClientConnected(int clientId){
        return false;
    }

    public void notifyAllClients(String msg){

    }

    public void notifyClientById(int clientId, String msg){

    }

    private int generateClientId(){
        return lastClientId.getAndIncrement();
    }

}