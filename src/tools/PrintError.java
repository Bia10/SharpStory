package tools;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

public class PrintError {

    public static final String PLAYER_LOGGEDIN = "playerLoggedin.rtf",
            EXCEPTION_CAUGHT = "exceptionCaught.rtf",
            DEBUG = "debug.rtf", DISCONNECT_FUNC = "disconnectFunc.rtf",
            REMOVEPLAYER_FUNC = "removeFunc.rtf",
            GUILD_BROADCAST = "guildBroadcast.rtf",
            SAVE_TO_DB = "saveToDB.rtf",
            SAVE_ITEMS = "saveItems.rtf",
            LOAD_ITEMS = "loadItems.rtf",
            UNHANDLED_MESSAGE = "unhandledMessage.rtf",
            CHANGE_CHANNEL = "changeChannel.rtf";//more to come (maps)

    //private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    public static void print(final String file, final Throwable t) {
        FileOutputStream out = null;
        try {
            out = new FileOutputStream(file, true);
            out.write(getString(t).getBytes());
            out.write("\n---------------------------------\n".getBytes());
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static void print(final String file, final String s) {
        FileOutputStream out = null;
        try {
            out = new FileOutputStream(file, true);
            out.write(s.getBytes());
            out.write("\n---------------------------------\n".getBytes());
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    private static String getString(final Throwable e) {
        String retValue = null;
        StringWriter sw = null;
        PrintWriter pw = null;
        try {
            sw = new StringWriter();
            pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            retValue = sw.toString();
        } finally {
            try {
                if (pw != null) {
                    pw.close();
                }
                if (sw != null) {
                    sw.close();
                }
            } catch (IOException ignore) {
            }
        }
        return retValue;
    }
}
